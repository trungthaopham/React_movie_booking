import { Button, CardActions, CardMedia, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingLeft: 0,
        paddingRight: 0,
    },
    title: {
        padding: theme.spacing(3)
    },
    subtitle: {
        padding: theme.spacing(3)
    },
    image: {
        width: '100%',
        height: "100%",
        padding: theme.spacing(3),
        '@media (min-width:600px)': {
            width: '100%',
            height: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
            height: "100%",
        },
    },
}));
export default function Magazine() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>

            <Paper>
                <Typography component="h1" variant="h4" className={classes.title, " text-center p-4"} style={{ textTransform: "capitalize" }}>
                    Điện ảnh 24h
                    </Typography>
                <Grid container>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={6} md={6} spacing={3}>
                            <Typography component="h2" variant="h4" className={classes.title}>
                                “Bóc tem” tổ hợp giải trí mới toanh của giới Sài Thành
                                </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle}>
                                Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống ảo
                                độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai trương tại
                                360 Giải Phóng!
                                </Typography>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Xem thêm..
                                </Button>
                            </CardActions>
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} spacing={3}>
                            <CardMedia className={classes.image}
                                component="img"
                                alt="Contemplative Reptile"
                                height="100%"
                                image="./image/boc-tem.jpg"
                                title="Contemplative Reptile"
                            /></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={6} spacing={3}>
                            <CardMedia className={classes.image}
                                component="img"
                                alt="Contemplative Reptile"
                                height="100%"
                                image="./image/tiec-trang-mau.png"
                                title="tiec trang mau"
                            /></Grid>
                        <Grid item xs={12} sm={6} spacing={3}>
                            <Typography component="h2" variant="h4" className={classes.title}>
                                Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công
                                chiếu
                                </Typography>
                            <Typography variant="subtitle1" className={classes.subtitle}>
                                Sau 2 tuần ra mắt, Tiệc Trăng Máu chính thức gia nhập câu lạc bộ
                                phim điện ảnh đạt 100 tỷ đồng doanh thu phòng vé. Dàn ngôi sao
                                “bạc tỷ” của phim cũng lần đầu tiên hội tụ đầy đủ trong một
                                khung hình để ăn mừng thành tích ấn tượng
                                </Typography>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Xem thêm..
                                </Button>
                            </CardActions>
                        </Grid>

                    </Grid>

                </Grid>
            </Paper>
        </Container>
    )
}
