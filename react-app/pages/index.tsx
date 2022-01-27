import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";

function Home() {
  return (
    <div>
      {/* <GetForm /> */}
      <PostForm />
    </div>
  );
}

function GetForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(
      (
        await axios.get(`http://localhost:8000/dump-data`, {
          params: {
            firstname: values.firstname,
            lastname: values.lastname,
          },
        })
      ).data
    );
    setLoading(false);
  };

  return (
    <div>
      <h1>GET Form upload</h1>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{ firstname: "", lastname: "" }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form
            onSubmit={handleSubmit}
            // method="GET"
            // action="http://localhost:8000/dump-data"
          >
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              value={values.firstname}
              placeholder="Firstname"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChange}
              value={values.lastname}
              placeholder="Lastname"
            />

            <button type="submit">{loading ? "Loading..." : "Save"}</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

function PostForm() {
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (values: any) => {
  //   let formData = new FormData();
  //   formData.append("firstname", values.firstname);
  //   formData.append("lastname", values.lastname);
  //   formData.append("sampleFile", values.sampleFile);

  //   setLoading(true);
  //   console.log(
  //     (
  //       await axios.post(`http://localhost:8000/dump-data-post`, {
  //         data: formData,
  //       })
  //     ).data
  //   );
  //   setLoading(false);
  // };

  return (
    <div>
      <h1>POST Form upload</h1>

      {/* <Formik
        onSubmit={handleSubmit}
        initialValues={{ firstname: "", lastname: "", sampleFile: "" }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              value={values.firstname}
              placeholder="Firstname"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChange}
              value={values.lastname}
              placeholder="Lastname"
            />
            <input
              type="file"
              name="sampleFile"
              id="sampleFile"
              onChange={handleChange}
              value={values.sampleFile}
            />

            <button type="submit">{loading ? "Loading..." : "Save"}</button>
          </form>
        )}
      </Formik> */}

      <Formik
        onSubmit={() => {}}
        initialValues={{ firstname: "", lastname: "", sampleFile: "" }}
      >
        {({ values, handleChange }) => (
          <form
            method="POST"
            action="http://localhost:8000/dump-data-post"
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              value={values.firstname}
              placeholder="Firstname"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChange}
              value={values.lastname}
              placeholder="Lastname"
            />
            {/* <input
              type="file"
              name="sampleFile"
              id="sampleFile"
              onChange={handleChange}
              value={values.sampleFile}
            /> */}
            <input
              type="file"
              name="sampleFile"
              id="sampleFile"
              onChange={handleChange}
              value={values.sampleFile}
              multiple
            />

            <button type="submit">{loading ? "Loading..." : "Save"}</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
