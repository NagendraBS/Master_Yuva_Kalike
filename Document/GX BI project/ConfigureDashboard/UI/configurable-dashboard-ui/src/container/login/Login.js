/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Cookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { getEnterpriseList, getRolesList, login } from "../../services/LoginServices";
import { storeValue } from "../../utils/LocalStorage";
import gxProduct from "../../assets/gxProduct.png";
import { getDashboards } from "../../services/DashboardServices";
import DashboardActions from "../../actions/dashboardAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../components/AddUser.css";
import { administrationActions } from "../../actions";
 


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" © "}
      <a style={{textDecoration:"none" ,  color: "rgba(0, 0, 0, 0.54)"}} href="https://galaxe.com/" target="_blank" rel="noreferrer">
        Galaxe
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    display: "flex",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(10, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#000",
    backdropFilter: "blur(3px)",
  },
  redAsterisk: {
    color: 'red !important'  
  },
  
}));

export default function Login() {
  const classes = useStyles();
  const cookies = new Cookies();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [roleInputValue, setRoleInputValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const [enterpriseList, setEnterpriseList] = useState([]);
  const [selectedEnterprise, setSelectedEnterprise] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState([]);
  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const isUserIdPresentInArray = (userId) => {
    return savedCredentials.some((credential) => credential.userId === userId);
  };

  const handleUserIdChange = (event, newValue) => {
    setUserId(newValue);
  };

  const selectedEnterpriseId = () => {
    let selectedEnterpriseId;
    enterpriseList.map((item) => {
      if (item.enterpriseName === selectedEnterprise) {
        selectedEnterpriseId = item.enterpriseId;
      }
    });
    return selectedEnterpriseId;
  };

  const selectedRoleId = () => {
        let selectedRoleId;
    rolesList.map((item) => {
      if (item.roleName === selectedRole) {
                selectedRoleId = item.roleId;
      }
          });
        return selectedRoleId;
     };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const details = {
        enterpriseId: selectedEnterpriseId(),
        lanId: userId,
        roleId: selectedRoleId(),
        password: password,
      };
      const loginResp = await login(details);
      // Save user credentials in cookies if "Remember Me" is checked
      if (rememberMe) {
        // Check if the user ID and selected enterprise are already present in the array
        if (!isUserIdPresentInArray(userId)) {
          const newCredentials = { userId, password, selectedEnterprise, selectedRole };
          const updatedCredentials = [...savedCredentials, newCredentials];
          setSavedCredentials(updatedCredentials);

          // Save updated credentials array in cookies
          cookies.set("credentials", updatedCredentials, { path: "/" });
        }

        cookies.set("userId", userId, { path: "/" });
        cookies.set("password", password, { path: "/" });
        cookies.set("selectedRole", selectedRole, { path: "/" });
        cookies.set("selectedEnterprise", selectedEnterprise, { path: "/" });
      }

      // Retrieve user credentials from cookies on initial render

      if (loginResp?.status === 200 && loginResp?.data) {
        storeValue("userInfo", loginResp.data);
        const roleName = JSON.parse(localStorage.getItem("roleName"));
        if (roleName === "SUPERADMIN") {
          setLoading(false);
          navigate("../enterprise");
        } 
        else if (roleName === "ORGANIZATIONADMIN") {
          setLoading(false);
          navigate("../user");
        } 
        else if (roleName === "ENDUSER") {
          setLoading(false);
          navigate("../dashboardlist");
        } 
        else {
          const dName = await getDashboards();
          localStorage.setItem("slctedDashName", dName?.data[0]?.dashboardName);
          sessionStorage.setItem("applicationId", dName?.data[0]?.dashboardId);
          sessionStorage.setItem(
            "dashboardName",
            dName?.data[0]?.dashboardName
          );
          dispatch(DashboardActions.switchDashboard(dName?.data[0]));
          setLoading(false);
          navigate(
            `../dashboard/${dName?.data[0]?.dashboardName?.split(" ").join("")}`
          );
        }
        setErrorVal("");
      }
    } catch (err) {
      console.error(err, "login Err");
      setErrorVal("Invalid UserId or Password");
      setLoading(false);
    }
  };

  const fetchRolesData = async () => {
    setLoading(true)
    try {
      const information = {
        enterpriseId: selectedEnterpriseId(),
        lanId: userId
      };
      const rolesListResp = await getRolesList(information);
      if (rolesListResp.status === 200 && rolesListResp.data) {
        for(let i=0; i<rolesListResp.data.roleInfo.length; i++){
          rolesList[i] = rolesListResp.data.roleInfo[i].roleName+"-"+rolesListResp.data.roleInfo[i].groupName;
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  };
  localStorage.setItem("roleName", JSON.stringify(selectedRole));
  
  const fetchData = async () => {
    try {
      const enterpriseListResp = await getEnterpriseList();
      if (enterpriseListResp.status === 200 && enterpriseListResp.data) {
        setEnterpriseList(enterpriseListResp.data.enterpriseList);
        localStorage.setItem(
          "enterpriseId",
          JSON.stringify(enterpriseListResp?.data?.enterpriseList)
        );
        dispatch({
          type: administrationActions.getAllenterprises,
          payload: enterpriseListResp.data.enterpriseList,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = () => {
    if (selectedEnterprise && userId && password) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchData();

    const savedCredentialsFromCookies = cookies.get("credentials");

    if (Array.isArray(savedCredentialsFromCookies)) {
      setSavedCredentials(savedCredentialsFromCookies);
     
    }

    const savedUserId = cookies.get("userId");

    const savedPassword = cookies.get("password");

    const savedRole = cookies.get("selectedRole");

    const selectedEnterpriseFromCookies = cookies.get("selectedEnterprise");
    if (selectedEnterpriseFromCookies) {
      setSelectedEnterprise(selectedEnterpriseFromCookies);
    }
    if (savedUserId && savedPassword) {
      setUserId(savedUserId);

      setPassword(savedPassword);

      setSelectedRole(savedRole); 

      setRememberMe(true);
    } else {
      // Clear the dropdown values if the cookies are empty
      setUserId(null);
      setPassword(null);
      setRememberMe(false);
    }
  }, []);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <img style={{ width: "90%" }} src={gxProduct} alt="" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper} style={{ margin: "35px 32px" }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box mt={3} style={{fontSize:"15px"}}>Enter your Enterprise, User ID, Role and Password to Sign In.</Box>
            <form className={classes.form} onSubmit={handleLogin}>
              <Autocomplete
                value={selectedEnterprise}
                filterOptions={filterOptions}
                options={enterpriseList
                  .map((item) => item.enterpriseName)
                  .sort()}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                  setSelectedEnterprise(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                inputValue={inputValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="domain"
                    name="enterprise"
                    variant="outlined"
                    value={selectedEnterprise}
                    label="Enterprise"
                  />
                )}
              />
              <Autocomplete
                options={savedCredentials.map(
                  (credential) => credential.userId
                )}
                value={userId || null} // Set value to null if userId is falsy
                onBlur={() => fetchRolesData()}
                onChange={handleUserIdChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User ID"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="userId"
                    name="userId"
                    style={{marginBottom:"16px"}}
                    value={userId || ""} // Set value to an empty string if userId is falsy
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setRolesList([]);
                      setSelectedRole([]);
                      setErrorVal("");
                    }}
                  />
                )}
                freeSolo
              />
              <Autocomplete 
                value={selectedRole}
                options={rolesList}
                onChange={(event, newRoleValue) => {
                 const gettingNewRoleValue=newRoleValue.split("-");
                 const navigationRoleValue=gettingNewRoleValue[0];
                  setSelectedRole(navigationRoleValue);
                }}
                onInputChange={(event, newRoleInputValue) => {
                  setRoleInputValue(newRoleInputValue);
                }}
                inputValue={roleInputValue}
                renderInput={(params) => (
                  <TextField 
                    {...params}
                    id="role"
                    name="role"
                    variant="outlined"
                    value={selectedRole}
                    label="Role"
                  /> 
                )}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                autoComplete="off"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                }}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorVal("");
                }}
                InputProps={{
                   
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                <span style={{ color: "red" }}>{errorVal}</span>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <div
                style={{
                  cursor: !handleSignIn() ? "not-allowed" : "pointer",
                  opacity: !handleSignIn() ? 0.6 : 1,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  disabled={!handleSignIn()}
                  style={{
                    color: "var(--colorforwhite)",
                    height: 36.5,
                    width: "100%",
                    borderRadius: 0,

                    backgroundColor: "var(--dashboardBgColor)",

                    fontSize: "14px",

                    textTransform: "none",

                    border: "none",
                  }}
                >
                  Sign In
                </Button>
              </div>

              <Box mt={2}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "red" }}
      />
    </>
  );
}
