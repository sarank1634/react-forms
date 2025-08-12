import { useNavigate } from "react-router-dom";

const unauhorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate (-1);
    return(
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have the acess to the required page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default unauhorized;