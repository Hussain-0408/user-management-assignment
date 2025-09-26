
import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react';
import { Col, Button, Row, FormGroup, Container, Modal } from 'react-bootstrap'
import * as Yup from 'yup';

function FormValidation() {

  const [result, setResult] = useState([])
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteid, setDeleteid] = useState(null)
  const [editUser, setEditUser] = useState({})
  const [id, setId] = useState()
  

  const fetchdata = () => {
    axios.get("https://68d6104dc2a1754b42695f65.mockapi.io/usermanagement").then((res) => {
      setResult(res.data)
     
    }).catch(err => console.log(err))
  }
  const postData = (value) => {
    axios.post("https://68d6104dc2a1754b42695f65.mockapi.io/usermanagement", value).then((res) => {
      setResult([...result, res.data])

    })
  }

  const getdata = (id) => {
    axios.get(`https://68d6104dc2a1754b42695f65.mockapi.io/usermanagement/${id}`).then((res) => {
      setEditUser(res.data)
      setId(res.data.id)
      setEdit(true)
     
    }).catch(err => console.log(err))
  }

  const handledelte = () => {
    axios.delete(`https://68d6104dc2a1754b42695f65.mockapi.io/usermanagement/${deleteid}`).then(() => {
      fetchdata();
      setShow(false);
    });
  }

  const handleupdate = (value) => {
    // console.log(id)
    axios.put(`https://68d6104dc2a1754b42695f65.mockapi.io/usermanagement/${id}`,value).then((res) => {
           fetchdata();
      setEdit(false)
           
    })
  }


  const handleclose = () => setShow(false)
  const handleshow = (id) => {
    setShow(true)
    setDeleteid(id)
  }
  
  useEffect(() => {
    fetchdata()
    // postData()
  }, [])

  const signupschema = Yup.object({
    name: Yup.string().max(20, "Too Long").required("required"),
    email: Yup.string().email("invalid email").required("required"),
    username: Yup.string().max(20, "to Long").required("required")
  });

  return (
    <div className="min-vh-100 d-flex  align-items-center bg-success">
      <Container>
        <Row className="justify-content-between g-5">
          <Col xs={12} md={8} lg={4}>
            <Formik
              initialValues={{ name: "", email: "", username: "" }}
              validationSchema={signupschema}
              onSubmit={(value, { resetForm }) => {
                // console.log(value)
                postData(value);
                resetForm();
                // alert("Data update successfully")
                // setResult([])
                window.confirm("updated succecfully")


              }}
            >
              <Form className="bg-white p-4">
                <h2 className="text-center mb-4 text-success fs- 3 fw-bold">User Validation Form</h2>

                <FormGroup className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"

                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <Field
                    type="email"
                    name="email"

                    className="form-control"
                    placeholder="Enter your email"
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <label className="form-label fw-bold">Username</label>
                  <Field
                    type="text"
                    name="username"

                    className="form-control"
                    placeholder="Enter a username"
                  />
                </FormGroup>

                <div className="d-grid">

                  <Button type="submit" className="btn border-danger btn-success" >
                    Submit
                  </Button>

                </div>
              </Form>
            </Formik>
          </Col>

          <Col xs={12} md={12} lg={8}>
            <div className=" bg-white">

              < div className="table-responsive" >
                <table className="table table-hover text-center align-middle">
                  <thead className="table-success fs-5">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Username</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.map((e, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.username}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              variant="outline-primary"
                              className="px-3" onClick={() => getdata(e.id)}>  Edit  </Button>
                            <Button
                              variant="outline-danger" className="px-3" onClick={() => handleshow(e.id)}>   Delete </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </Col>
          <Modal show={show} onHide={handleclose} centered>
            <Modal.Dialog >
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Are you confirm to delete</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleclose}>Cancel</Button>
                <Button variant="primary" onClick={handledelte}>Delete</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>


          <Modal show={edit} onHide={handleclose} centered>
            <Modal.Dialog >
              <Formik
                initialValues={{  name: editUser.name, email: editUser.email, username: editUser.username }}
                validationSchema={signupschema}
                onSubmit={(value, { resetForm }) => {
                  // console.log(value)
                  // postData(value);
                  // getdata(value.id)
                  handleupdate(value)
                  resetForm();
                  // alert("Data update successfully")
                  // setResult([])
                  window.confirm("updated succecfully")


                }}
              >
                <Form className="bg-white p-4">
                  <h2 className="text-center mb-4 text-success fs- 3 fw-bold">User Validation Form</h2>

                  <FormGroup className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"

                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <Field
                      type="email"
                      name="email"

                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <Field
                      type="text"
                      name="username"

                      className="form-control"
                      placeholder="Enter a username"
                    />
                  </FormGroup>

                  <div className="d-grid">

                    <Button type="submit" className="btn border-danger btn-success"  >
                      Update
                    </Button>

                  </div>
                </Form>
              </Formik>
            </Modal.Dialog>
          </Modal>

        </Row>
      </Container>
    </div >
  )
}


export default FormValidation 
