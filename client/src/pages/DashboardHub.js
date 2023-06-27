// import React, { useState, useEffect }  from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import {
//   Breadcrumb,
//   Layout,
//   theme,
//   Card,
//   Button,
//   Space,
//   Row,
//   Col,
//   Descriptions,
//   Typography,
//   Pagination,
// } from "antd";
// import { useQuery } from "@apollo/client";
// import {
//   GET_SINGLE_PROGRAM,
//   GET_ME,
// } from "../utils/queries";
// import Auth from "../utils/auth";
// const { Content } = Layout;
// const { Title, Text } = Typography;

// const { Meta } = Card;

// const Dashboard = () => {
// const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
// const [currentProgram, setCurrentProgram] = useState(null);
// const [currentPage, setCurrentPage] = useState(1);

//   const navigate = useNavigate();

//   if (!Auth.loggedIn()) {
//     navigate("/");
//   }

// useEffect(() => {
//   if (!loadingMe && dataMe) {
//     // We actually only want to track the active program on the user using a single id. This avoids some of the confusion around multiple programs being treated as current.
//     // const currentProgram = dataMe.me.programs.find(program => program.current === true);
//     // setCurrentProgram(currentProgram);
//     setCurrentProgram(dataMe.me.activeProgram);
//   }
// }, [loadingMe, dataMe]);

//   // const workouts = data?.singleprogram || []
//   // place components in here
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout className="layout">
//       <Content
//         style={{
//           padding: "0 50px",
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: "16px 0",
//           }}
//         >
//           {loadingMe ? (
//             <Breadcrumb.Item>Loading....</Breadcrumb.Item>
//           ) : (
//             <Breadcrumb.Item>
//               Current Program:{" "}
//               {currentProgram ? currentProgram.title : " No Active Program"}
//             </Breadcrumb.Item>
//           )}
//           <Link to="/programs">
//             <Breadcrumb.Item>View All Programs</Breadcrumb.Item>
//           </Link>
//         </Breadcrumb>
//         <div
//           className="site-layout-content"
//           style={{
//             background: colorBgContainer,
//           }}
//         >
//           {!loadingMe && currentProgram && (
//             <Layout>
//               <Space direction="vertical">
//                 <Title level={3}>Program Info</Title>
//                 <Text strong>Program title: </Text>
//                 <Text>{currentProgram.title}</Text>
//                 <Text strong>Duration (weeks): </Text>
//                 <Text>{currentProgram.duration}</Text>
//                 <Text strong>Days per week: </Text>
//                 <Text>{currentProgram.daysPerWeek}</Text>
//                 <Text strong>Description: </Text>
//                 <Text>{currentProgram.description}</Text>
//                 <br></br>
//               </Space>
//             </Layout>
//           )}

//           {/* number of cards changes depending on number of workouts per week in program */}

//           {loadingMe || !currentProgram ? (
//             <p>Waiting for workouts...</p>
//           ) : (
//             currentProgram.workouts.map((workouts) => (
//               <Card key={workouts._id} title="Workouts For the Week">
//                 <Row>
//                   <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
//                     <Card
//                       title="Day 1"
//                       style={{
//                         width: 300,
//                       }}
//                       cover={
//                         <img
//                           alt="example"
//                           src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//                         /> /* program image */
//                       }
//                       actions={[
//                         <Space direction="horizontal">
//                           <Link to={`/startworkout/${workouts._id}`}>
//                             <Button type="primary">Start</Button>
//                           </Link>
//                           <Link to="/">
//                             <Button type="secondary">View</Button>
//                           </Link>
//                         </Space>,
//                       ]}
//                     >
//                       <Meta title={workouts.name} description="Day of Squats" />
//                     </Card>
//                   </Col>
//                 </Row>
//               </Card>
//             ))
//           )}

//           <Row justify="end">
//             <Space direction="horizontal">
//               <Link to="/">
//                 <Button type="secondary">Next Week</Button>
//               </Link>
//             </Space>
//           </Row>
//         </div>
//       </Content>
//       <Row justify="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
//         <Space direction="vertical">
//           <Link to="/createprogram">
//             <Button type="primary" size="large">
//               Create Program!
//             </Button>
//           </Link>
//         </Space>
//       </Row>
//     </Layout>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Layout,
  theme,
  Card,
  Button,
  Space,
  Row,
  Col,
  Descriptions,
  Typography,
  Pagination,
  Empty
} from "antd";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROGRAM, GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const { Content } = Layout;
const { Title, Text } = Typography;

const { Meta } = Card;

const Dashboard = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleCreateProgramClick = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/createprogram"); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  const handleViewPrograms = () => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      navigate("/viewallprograms"); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  const handleStartWorkoutClick = (event) => {
    console.log("button clicked");
    if (Auth.loggedIn()) {
      const workoutId = event.target.value;
      navigate(`/startworkout`); // Redirect to dashboard if logged in.
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loadingMe && dataMe) {
      setCurrentProgram(dataMe.me.activeProgram);
    }
  }, [loadingMe, dataMe]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {loadingMe ? (
            <Breadcrumb.Item>Loading....</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              Current Program:{" "}
              {currentProgram ? currentProgram.title : " No Active Program"}
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item onClick={handleViewPrograms}>
            View All Programs
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {!loadingMe && currentProgram && (
            <Layout>
              <Space direction="vertical">
                <Title level={3}>Program Info</Title>
                <Text strong>Program title: </Text>
                <Text>{currentProgram.title}</Text>
                <Text strong>Duration (weeks): </Text>
                <Text>{currentProgram.duration}</Text>
                <Text strong>Days per week: </Text>
                <Text>{currentProgram.daysPerWeek}</Text>
                <Text strong>Description: </Text>
                <Text>{currentProgram.description}</Text>
                <br></br>
              </Space>
            </Layout>
          )}

          {loadingMe || !currentProgram ? (
            <Row justify="center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Row>
          ) : (
            <>
              {currentProgram.workouts
                .slice(
                  (currentPage - 1) * currentProgram.daysPerWeek,
                  currentPage * currentProgram.daysPerWeek
                )
                .map((workout, index) => (
                  <Card
                    key={workout._id}
                    title={`Workout for Day ${index + 1}`}
                  >
                    <Row>
                      <Col
                        xs={{ span: 5, offset: 1 }}
                        lg={{ span: 6, offset: 2 }}
                      >
                        <Card
                          title={workout.name}
                          style={{ width: 300 }}
                          cover={
                            <img
                              alt="example"
                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            /> /* workout image */
                          }
                          actions={[
                            <Space direction="horizontal">
                              <Link to={`/startworkout/${workout._id}`}>
                                <Button type="primary">Start</Button>
                              </Link>
                              <Link to="/">
                                <Button type="secondary">View</Button>
                              </Link>
                            </Space>,
                          ]}
                        >
                          <Meta
                            title={`Workout ID: ${workout._id}`}
                            description={`Number of exercises: ${workout.exercises.length}`}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                ))}
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={currentProgram.duration * currentProgram.daysPerWeek}
              />
            </>
          )}
        </div>
        <Row justify="end">
          <Row justify="end">
            <Space direction="horizontal">
              <Link to="/">
                <Button type="secondary">Next Week</Button>
              </Link>
            </Space>
          </Row>
        </Row>{" "}
       
      </Content>

      <Row justify="center" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            onClick={handleCreateProgramClick}
          >
            Create Program!
          </Button>
        </Space>
      </Row>
    </Layout>
  );
};

export default Dashboard;
