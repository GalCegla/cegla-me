export default function WordSlicer(body: string): string {
  if (body[30] === " ") {
    return body.slice(0, 30) + "...";
  } else if (body.length < 30) {
    return body;
  }
  for (let i = 0; i <= body.length; i++) {
    if (i >= 29 && body[i] === " ") {
      const slicedBody = body.slice(0, i) + "...";
      return slicedBody;
    }
  }
  return "No content found :(";
}
