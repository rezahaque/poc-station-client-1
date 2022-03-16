import RegistrationForm from "components/authentication/RegistrationForm";
import Registration from "components/authentication/simple/Registration";

const Signup = () => {
    return (
        <div className="signup-section container">
            <div className="flex-center min-vh-100 row">
                <div className="col-xxl-4 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                    <Registration />
                </div>
            </div>
        </div>
    )
}

export default Signup;