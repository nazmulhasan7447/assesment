import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Container, Row, Col } from "react-bootstrap";
import { size } from "lodash";
import { useSnackbar } from "notistack";
import cryptoRandomString from "crypto-random-string";
import AppContext from "./context/AppContext";
import { sectors } from "./Sectors";
import UserEntries from "./User-entries-data-table";

const AddCurrentlyInvolvedInfo = () => {
  const appContext = useContext(AppContext);
  const { entries, setEntries } = appContext || {};
  const { enqueueSnackbar } = useSnackbar();

  const [involvedInfo, setInvolvedInfo] = useState({
    name: "",
    sector: { id: "", name: "" },
    isAgreed: false,
  });

  console.log(entries);

  const onChangeHandler = (event) => {
    if (event?.target?.name === "isAgreed") {
      setInvolvedInfo({
        ...involvedInfo,
        [event.target.name]: event.target.checked,
      });
    } else if (event?.target?.name === "sector") {
      const target = event.target;
      setInvolvedInfo({
        ...involvedInfo,
        sector: {
          id: parseInt(target?.value),
          name: target.options[target.selectedIndex].text?.trim(),
        },
      });
    } else {
      setInvolvedInfo({
        ...involvedInfo,
        [event.target.name]: event.target.value,
      });
    }
  };

  const hanldeSave = (event) => {
    event.preventDefault();

    if (
      involvedInfo &&
      involvedInfo?.name &&
      involvedInfo?.sector?.id &&
      involvedInfo?.isAgreed
    ) {
      if (
        !size(
          entries?.filter(
            (item) =>
              item?.sector?.id === involvedInfo?.sector?.id &&
              item?.name === involvedInfo?.name
          )
        )
      ) {
        setEntries([
          ...entries,
          { ...involvedInfo, id: cryptoRandomString({ length: 15 }) },
        ]);
      } else {
        enqueueSnackbar("Already exists", { variant: "warning" });
      }
    }
  };

  const handleRemove = (id) => {
    setEntries(entries?.filter((item, index) => item?.id !== id));
    enqueueSnackbar("Successfully removed", { variant: "success" });
  };

  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <div className="add__involved_sector__form">
            <div className="row">
              <div className="col-12">
                <h5>
                  Please enter your name and pick the Sectors you are currently
                  involved in:
                </h5>
              </div>
            </div>
            <form onSubmit={hanldeSave}>
              <div className="row mb-3 mt-3">
                <label for="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    name="name"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label for="inputPassword3" className="col-sm-2 col-form-label">
                  Sectors
                </label>
                <div className="col-sm-10">
                  <select
                    class="form-select"
                    id="autoSizingSelect"
                    size={15}
                    name="sector"
                    onChange={onChangeHandler}
                  >
                    {size(sectors) &&
                      sectors?.map((item) => {
                        if (item?.sub_fields) {
                          return (
                            <optgroup label={item?.name} key={item?.id}>
                              {size(item?.sub_fields) &&
                                item?.sub_fields?.map((sub_item) => {
                                  if (size(sub_item?.sub_fields)) {
                                    return (
                                      <>
                                        <option
                                          value={sub_item?.id}
                                          key={sub_item?.id}
                                          style={{ fontWeight: "500" }}
                                          disabled
                                        >
                                          {sub_item?.name}
                                        </option>
                                        {size(sub_item?.sub_fields) &&
                                          sub_item?.sub_fields?.map(
                                            (sub_sub_item) => {
                                              return (
                                                <option
                                                  value={sub_sub_item?.id}
                                                  key={sub_sub_item?.id}
                                                >
                                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                  {sub_sub_item?.name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </>
                                    );
                                  }
                                  return (
                                    <option
                                      value={sub_item?.id}
                                      key={sub_item?.id}
                                    >
                                      {sub_item?.name}
                                    </option>
                                  );
                                })}
                            </optgroup>
                          );
                        }
                        return (
                          <option value={item?.id} key={item?.id}>
                            {item?.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      name="isAgreed"
                      onChange={onChangeHandler}
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Agree to terms
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={
                  !(
                    involvedInfo &&
                    involvedInfo?.name &&
                    involvedInfo?.sector?.id &&
                    involvedInfo?.isAgreed
                  )
                }
              >
                Save
              </button>
            </form>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>

      <UserEntries handleRemove={handleRemove} />
    </Container>
  );
};

export default AddCurrentlyInvolvedInfo;
