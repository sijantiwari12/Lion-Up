import React, { Fragment,Component } from "react";
import { Container, Grid, Card } from "semantic-ui-react";
import NavBar from "../nav/NavBar/NavBar";
import "./Home.css";

class HomePage extends Component {
   componentDidMount() {
    window.twttr.widgets.load();
  };
  render() { 
  return (
    <Fragment>
      <NavBar />
      <Container className="main">
        <Grid>
          <Grid.Column width={3}>
            <div className="segment1">
              <div className="label-student-engagement">Student Engagement</div>
              <a href="http://www.southeastern.edu/admin/cab/index.html">
                <img
                  src="/assets/campusactivities.jpg"
                  className="se-image"
                  alt="Selu Leonet"
                />
              </a>
              <a href="http://www.southeastern.edu/admin/fsl/index.html">
                <img
                  src="/assets/greeklife.jpg"
                  className="se-image"
                  alt="Selu Moodle"
                />
              </a>
              <a href="http://www.southeastern.edu/admin/lead_dev/index.html">
                <img
                  src="/assets/leadershipdevelopment.jpg"
                  className="se-image"
                  alt="Selu Webmail"
                />
              </a>
              <a href="http://www.southeastern.edu/admin/misa/index.html">
                <img
                  src="/assets/multicultural.jpg"
                  className="se-image"
                  alt="Selu Time"
                />
              </a>
              <a href="http://www.southeastern.edu/admin/stu_orgs/index.html">
                <img
                  src="/assets/studentorg.jpg"
                  className="se-image"
                  alt="Selu Time"
                />
              </a>
              <a href="http://www.southeastern.edu/admin/sga/index.html">
                <img
                  src="/assets/studentgov.jpg"
                  className="se-image"
                  alt="Selu Time"
                />
              </a>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card style={{ width: "650px" }}>
            <div>
              <a
                  class="twitter-timeline"
                  data-width="600px"
                  href="https://twitter.com/oursoutheastern?ref_src=twsrc%5Etfw">
              </a>
                            
              </div>
            </Card>
          </Grid.Column>

          <Grid.Column width={3}>
            <div className="segment2">
              <div className="label-quick-link">Quick Links</div>
              <a href="http://webmail.g.selu.edu/">
                <img
                  src="/assets/webmail.png"
                  className="quicklink-image"
                  alt="Selu Leonet"
                />
              </a>
              <a href="https://moodle.selu.edu/moodle/">
                <img
                  src="/assets/moodle.png"
                  className="quicklink-image"
                  alt="Selu Moodle"
                />
              </a>
              <a href="http://calendar.selu.edu/">
                <img
                  src="/assets/googlecalendar.png"
                  className="quicklink-image"
                  alt="Selu Webmail"
                />
              </a>
              <a href="https://drive.google.com/drive/u/0/">
                <img
                  src="/assets/googledrive.png"
                  className="quicklink-image"
                  alt="Selu Time"
                />
              </a>
              <a href="https://psrv1.selu.edu:8002/psp/saprd/?cmd=login&languageCd=ENG&">
                <img
                  src="/assets/leonet.png"
                  className="quicklink-image"
                  alt="Selu Time"
                />
              </a>
              <a href="https://psrv8.selu.edu/psp/hrprd/EMPLOYEE/HRMS/h/?tab=DEFAULT&cmd=login&languageCd=ENG&">
                <img
                  src="/assets/timeandlabor.png"
                  className="quicklink-image"
                  alt="Selu Time"
                />
              </a>
              <a href="https://jobs.selu.edu/applicants/jsp/shared/Welcome_css.jsp">
                <img
                  src="/assets/jobs.png"
                  className="quicklink-image"
                  alt="Selu Time"
                />
              </a>
              <a href="http://www.southeastern.edu/search/index.html">
                <img
                  src="/assets/directory.png"
                  className="quicklink-image"
                  alt="Selu Time"
                />
              </a>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </Fragment>

    // <Segment inverted textAlign="center" vertical className="masthead">
    //   <Container text>
    //     <Header as="h1" inverted>
    //       <Image
    //         size="small"
    //         src="/assets/logo.png"
    //         alt="logo"
    //         style={{ marginBottom: 12 }}
    //       />
    //       Re-vents
    //     </Header>
    //     <Button onClick={() => history.push("/events")} size="huge" inverted>
    //       Get started
    //       <Icon name="right arrow" inverted />
    //     </Button>
    //   </Container>
    // </Segment>
  );
  }
};

export default HomePage;
