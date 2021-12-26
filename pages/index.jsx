import "twin.macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn } from "../src/redux/slice/auth/action";
const Home = ({ status, userData, signIn }) => {
  console.log(userData);
  return (
    <div tw="flex flex-col justify-center items-center h-screen">
      <h1 tw="text-xl font-medium text-center">Hello World</h1>
      <div tw="flex flex-col gap-2.5 ">
        <h4>Name: {userData?.name ?? "empty"}</h4>
        <h4>Username: {userData?.username ?? "empty"}</h4>
        <h4>Email: {userData?.email ?? "empty"}</h4>
      </div>

      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  status: state?.auth?.authData?.status ?? false,
  userData: state?.auth?.authData ?? {},
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
