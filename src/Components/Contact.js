import { Container, makeStyles, Paper, } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        paddingLeft: 0,
        paddingRight: 0,
    },

}));
export default function Contact() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.root}>
            <Paper spacing={3} style={{ padding: '20px' }}>
                <div className="emp-profile">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/p200x200/51775693_2268512810138714_8065933845855207424_n.jpg?_nc_cat=111&ccb=2&_nc_sid=7206a8&_nc_ohc=_vYEs5ZrmDAAX_TG8NP&_nc_ht=scontent.fsgn3-1.fna&tp=6&oh=9bc90b8be4069b7d4feefe7a9295b3e9&oe=60363036" alt />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5 style={{ texttransform: "uppercase" }}>
                                        Phạm Trung Thảo
                    </h5>
                                    <h6>
                                        Lập trình và thiết kế website
                    </h6>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Thông tin</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Quá trình</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <h6 classname="font-weight-bold">Công việc:</h6>
                                    <p>Hiện tại là sinh viên</p><br />
                                    <h6 classname="font-weight-bold">Kỹ năng:</h6>
                                    <span>UX/UI</span><br />
                                    <span>Reactjs</span><br />
                                    <span>Angularjs</span><br />
                                    <span>Laravel</span><br />
                                    <span>WordPress</span><br />
                                    <span>PHP</span><br />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Họ và tên:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Phạm Trung Thảo</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>trungthao020797@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Số điện thoại:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>0967271252</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Nghề nghiệp:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Sinh Viên</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Mạng xã hội:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <a href="https://www.facebook.com/pham.nguyen.71216/">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-facebook mr-2" viewBox="0 0 16 16">
                                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                    </svg>
                            Thảo Phạm</a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Sở thích:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Du lịch, xem phim, nuôi cá,...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Kinh nghiệm:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Ngoại ngữ</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Ngôn ngữ Anh</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </Paper>
        </Container>

    )
}
