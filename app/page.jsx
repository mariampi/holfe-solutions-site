import { indexBody } from "./index-body";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: indexBody }} />
      <script src="/script.js" defer />
    </>
  );
}
