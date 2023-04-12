import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {RegisterMutation} from "../../types";
import {register} from "../../components/users/usersThunks";
import {selectRegisterError, selectRegisterLoading} from "../../components/users/usersSlice";
import {Avatar, Box, Container, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from "../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import { useRouter } from "next/navigation";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const loading = useAppSelector(selectRegisterLoading);
    const router = useRouter();
    const [btnLoading, setBtnLoading] = useState(true);
    const [state, setState] = useState<RegisterMutation>({
        email: '',
        firstName: '',
        password: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            router.push('/');
        } catch (e) {
            throw new Error();
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: files && files[0] ? files[0] : null,
        }));
    };

    useEffect(() => {
        if (state.email.length && state.firstName.length && state.password.length) {
            setBtnLoading(false);
        }
    }, [state]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="e-mail"
                                name="email"
                                autoComplete="new-email"
                                value={state.email}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Display name"
                                name="firstName"
                                autoComplete="new-displayName"
                                value={state.firstName}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('firstName'))}
                                helperText={getFieldError('firstName')}
                            />
                        </Grid>
                        <Grid item xs>
                            <FileInput label="Avatar" onChange={fileInputChangeHandler} name="avatar" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        disabled={btnLoading}
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
