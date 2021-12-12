const USER_ID_LOCAL_STORAGE_ITEM = "USER_ID";

let id: string | null = null;

export function setId(value: string): void {
  id = value;
  localStorage.setItem(USER_ID_LOCAL_STORAGE_ITEM, value);
}

export function getId(): string | null {
  if (!id) {
    id = localStorage.getItem(USER_ID_LOCAL_STORAGE_ITEM);
  }
  return id;
}
