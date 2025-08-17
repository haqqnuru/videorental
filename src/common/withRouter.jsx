
//a wrapper to use react hooks in a class component
import { useNavigate, useParams } from "react-router-dom";

function withRouter(Component) 
{
  return function (props) {
    const params = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  };
}

export default withRouter; 