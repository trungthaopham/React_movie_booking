import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { GetInforAction } from '../../redux/actions/UserActions';
import { USER_LOGIN } from '../../Util/Config';
import { history } from '../../Util/History';
import { HANDLE_CHANGE_INPUT } from '../../redux/const/UseConst';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserInfor() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { registerValues, registerErrors } = useSelector((state) => state.UserReducer.registerStateForm);

    const handleChange = (e) => {
        let { name, value } = e.target;
        let types = e.target.getAttribute("types");

        let newValues = { ...registerValues, [name]: value };


        let newErrors = { ...registerErrors };
        newErrors[name] = value.trim() === "" ? "Không được bỏ trống" : "";
        console.log(name, value);
        // Validation types
        if (types === "soDt") {
            const regexNumber = /^[0-9]+$/;
            if (!regexNumber.test(value.trim())) {
                newErrors[name] = "Dữ liệu phải là số!";
            }
        }

        if (types === "email") {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/;
            if (!regexEmail.test(value.trim())) {
                newErrors[name] = "Dữ liệu không hợp lệ!";
            }
        }

        let action = {
            type: HANDLE_CHANGE_INPUT,
            newState: {
                registerValues: newValues,
                registerErrors: newErrors,
            },
        };
        dispatch(action);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(e);
    //     let valid = true;
    //     for (let name in registerValues) {
    //         if (registerValues[name].toString().trim() === "") {
    //             valid = false;
    //         }
    //     }
    //     for (let name in registerErrors) {
    //         if (registerErrors[name].toString().trim() !== "") {
    //             valid = false;
    //         }
    //     }

    //     if (!valid) {
    //         Swal.fire("Thông báo", "Dữ liệu không hợp lệ!", "error");
    //         return;
    //     }
    //     Swal.fire("Thông báo", "Đăng kí thành công!", "success");

    //     dispatch(await RegisterAction(registerValues));
    // };

    let userProfile = JSON.parse(localStorage.getItem(USER_LOGIN));
    let { inforUser } = useSelector(
        (state) => state.UserReducer
    );
    useEffect(async () => {
        let userFile = {};
        userFile.taiKhoan = userProfile.taiKhoan;
        dispatch(await GetInforAction(userFile));
    }, []);

    console.log(inforUser)
    // const handleEdit = async (userProfile) => {
    //     let user = {};
    //     user.taiKhoan = userProfile;
    //     dispatch(await GetInforAction(user));
    //     history.push("/thongtintaikhoan/editprofile");
    // };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Thông tin người dùng
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Họ và tên:"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                value={inforUser?.hoTen}
                                className="w-100"
                            />
                            <span className="errorInput">{registerErrors.hoTen}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Email:"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                value={inforUser?.email}
                                className="w-100"
                            />
                            <span className="errorInput">{registerErrors.email}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Số điện thoại:"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                value={inforUser?.soDT}
                                className="w-100"
                            />
                            <span className="errorInput">{registerErrors.soDT}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Tài khoản:"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                value={inforUser?.taiKhoan}
                                className="w-100"
                            />
                            <span className="errorInput">{registerErrors.taiKhoan}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Mật khẩu:"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                                type="password"
                                variant="outlined"
                                value={inforUser?.matKhau}
                                className="w-100"
                            />
                            <span className="errorInput">{registerErrors.matKhau}</span>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Edit
                    </Button>

                </form>
            </div>
        </Container>
    );
}