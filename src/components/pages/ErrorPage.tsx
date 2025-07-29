import { Link } from "react-router-dom";

export default function ErrorPage() {
    
    return (
    <div>
        ErrorPage
        <Link to={"/"}>
          <p>return to home</p>
        </Link>
    </div>
  )
}
