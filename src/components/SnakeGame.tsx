import { FC, useCallback, useEffect, useState } from "react";
import { Button, Frame, GroupBox } from "react95";

const GRID_SIZE = 14;

type Cell = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const randomFoodCell = (snakeCells: Cell[]): Cell => {
  const occupied = new Set(snakeCells.map((cell) => `${cell.x}:${cell.y}`));
  const available: Cell[] = [];

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!occupied.has(`${x}:${y}`)) available.push({ x, y });
    }
  }

  if (available.length === 0) return { x: 0, y: 0 };
  return available[Math.floor(Math.random() * available.length)];
};

interface SnakeGameProps {
  open: boolean;
  onClose: () => void;
}

const SnakeGame: FC<SnakeGameProps> = ({ open, onClose }) => {
  const [snake, setSnake] = useState<Cell[]>([
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]);
  const [food, setFood] = useState<Cell>({ x: 9, y: 7 });
  const [queuedDirection, setQueuedDirection] = useState<Direction>("right");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetSnake = useCallback(() => {
    const initialSnake = [
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 },
    ];
    setSnake(initialSnake);
    setQueuedDirection("right");
    setScore(0);
    setIsGameOver(false);
    setFood(randomFoodCell(initialSnake));
  }, []);

  useEffect(() => {
    if (!open) return;
    resetSnake();
  }, [open, resetSnake]);

  const setNextDirection = useCallback((next: Direction) => {
    setQueuedDirection((current) => {
      if (
        (current === "up" && next === "down") ||
        (current === "down" && next === "up") ||
        (current === "left" && next === "right") ||
        (current === "right" && next === "left")
      ) {
        return current;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open || isGameOver) return;

    const id = window.setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextDirection = queuedDirection;

        let nextHead: Cell = head;
        if (nextDirection === "up") nextHead = { x: head.x, y: head.y - 1 };
        if (nextDirection === "down") nextHead = { x: head.x, y: head.y + 1 };
        if (nextDirection === "left") nextHead = { x: head.x - 1, y: head.y };
        if (nextDirection === "right") nextHead = { x: head.x + 1, y: head.y };

        const hitsWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y >= GRID_SIZE;

        const hitsSelf = prevSnake.some(
          (cell) => cell.x === nextHead.x && cell.y === nextHead.y,
        );

        if (hitsWall || hitsSelf) {
          setIsGameOver(true);
          return prevSnake;
        }

        const nextSnake = [nextHead, ...prevSnake];
        const ateFood = nextHead.x === food.x && nextHead.y === food.y;

        if (!ateFood) {
          nextSnake.pop();
        } else {
          setScore((s) => s + 1);
          setFood(randomFoodCell(nextSnake));
        }

        return nextSnake;
      });
    }, 170);

    return () => window.clearInterval(id);
  }, [food.x, food.y, isGameOver, open, queuedDirection]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") setNextDirection("up");
      if (event.key === "ArrowDown") setNextDirection("down");
      if (event.key === "ArrowLeft") setNextDirection("left");
      if (event.key === "ArrowRight") setNextDirection("right");
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open, setNextDirection]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <Frame
        variant="window"
        style={{ width: "100%", maxWidth: 360, padding: 10, background: "#c0c0c0" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <strong>Snake.exe</strong>
          <Button onClick={onClose}>X</Button>
        </div>
        <div style={{ marginBottom: 8, fontSize: 12 }}>
          Score: {score} {isGameOver ? " - Game Over" : ""}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gap: 1,
            background: "#222",
            border: "2px solid #000",
            aspectRatio: "1 / 1",
            width: "100%",
            marginBottom: 10,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeCell = snake.some((cell) => cell.x === x && cell.y === y);
            const isFoodCell = food.x === x && food.y === y;
            const isHead = snake[0]?.x === x && snake[0]?.y === y;

            return (
              <div
                key={`${x}-${y}`}
                style={{
                  background: isFoodCell
                    ? "#ff2e2e"
                    : isHead
                      ? "#8cff6a"
                      : isSnakeCell
                        ? "#3dbf3d"
                        : "#101010",
                }}
              />
            );
          })}
        </div>

        <GroupBox label="Controls">
          <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>
            <Button
              disabled={isGameOver}
              onClick={() => setNextDirection("up")}
              style={{ width: 70 }}
            >
              Up
            </Button>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                disabled={isGameOver}
                onClick={() => setNextDirection("left")}
                style={{ width: 70 }}
              >
                Left
              </Button>
              <Button
                disabled={isGameOver}
                onClick={() => setNextDirection("right")}
                style={{ width: 70 }}
              >
                Right
              </Button>
            </div>
            <Button
              disabled={isGameOver}
              onClick={() => setNextDirection("down")}
              style={{ width: 70 }}
            >
              Down
            </Button>
          </div>
        </GroupBox>

        {isGameOver && (
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
            <Button onClick={resetSnake}>Play again</Button>
          </div>
        )}
      </Frame>
    </div>
  );
};

export default SnakeGame;
