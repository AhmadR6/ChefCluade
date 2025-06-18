import ReactMarkdown from "react-markdown";
import ReactDom from "react-dom";
export default function ClaudeRecipe(props) {
  return (
    <section className="suggested-recipe-container">
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
