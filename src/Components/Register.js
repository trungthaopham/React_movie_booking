import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_CHANGE_INPUT } from '../redux/const/UseConst'
import { RegisterAction } from '../redux/actions/UserActions';
import Swal from 'sweetalert2';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Phamthao
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(8, 4),
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

export default function Register() {
    const classes = useStyles();


    const dispatch = useDispatch();

    const { registerValues, registerErrors } = useSelector((state) => state.UserReducer.registerStateForm);

    const handleChange = (e) => {
        let { name, value } = e.target;
        let types = e.target.getAttribute("types");

        let newValues = { ...registerValues, [name]: value };


        let newErrors = { ...registerErrors };
        newErrors[name] = value.trim() === "" ? "Không được bỏ trống" : "";
        // console.log(name, value);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        let valid = true;
        for (let name in registerValues) {
            if (registerValues[name].toString().trim() === "") {
                valid = false;
            }
        }
        for (let name in registerErrors) {
            if (registerErrors[name].toString().trim() !== "") {
                valid = false;
            }
        }

        if (!valid) {
            Swal.fire("Thông báo", "Dữ liệu không hợp lệ!", "error");
            return;
        }
        Swal.fire("Thông báo", "Đăng kí thành công!", "success");

        dispatch(await RegisterAction(registerValues));
    };


    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="hoTen"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên"
                                autoFocus
                                onChange={handleChange}
                            />
                            <span className="errorInput">{registerErrors.hoTen}</span>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                            <span className="errorInput">{registerErrors.email}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Số điện thoại"
                                name="soDt"
                                autoComplete="Number"
                                onChange={handleChange}
                            />
                            <span className="errorInput">{registerErrors.soDt}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="taiKhoan"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Tài khoản"
                                onChange={handleChange}
                            />
                            <span className="errorInput">{registerErrors.taiKhoan}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="matKhau"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <span className="errorInput">{registerErrors.matKhau}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="matKhau-confirm"
                                label="Xác thực lại mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng ký
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="./login" variant="body2">
                                Bạn đã có tài khoản! Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Grid>
    )
}