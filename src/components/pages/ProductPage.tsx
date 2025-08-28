import { useNavigate } from "react-router-dom"
import PageLayout from "../layouts/PageLayout"

export default function ProductPage() {

  const navigate = useNavigate()

  return (
    <PageLayout>
      <div><h2>ProductPage</h2>
        <button className="cursor-pointer" onClick={() => navigate(`../`)}>return</button>
      </div>
    </PageLayout>
  )
}
