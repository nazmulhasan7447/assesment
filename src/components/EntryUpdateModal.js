import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import { size } from "lodash";
import { useSnackbar } from "notistack";
import cryptoRandomString from "crypto-random-string";
import AppContext from "./context/AppContext";
import { sectors } from "./Sectors";

const UpdateEntryModal = ({ id }) => {
  const [disable, setDisable] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const appContext = useContext(AppContext);
  const { entries, setEntries } = appContext || {};

  const [currentEntry, setCurrentEntry] = useState({});

  const onChangeHandler = (event) => {
    if (event?.target?.name === "isAgreed") {
      setCurrentEntry({
        ...currentEntry,
        [event.target.name]: event.target.checked,
      });
    } else if (event?.target?.name === "sector") {
      const target = event.target;
      setCurrentEntry({
        ...currentEntry,
        sector: {
          id: parseInt(target?.value),
          name: target.options[target.selectedIndex].text?.trim(),
        },
      });
    } else {
      setCurrentEntry({
        ...currentEntry,
        [event.target.name]: event.target.value,
      });
    }
  };

  const hanldeSave = (event) => {
    event.preventDefault();

    if (
      currentEntry &&
      currentEntry?.name &&
      currentEntry?.sector?.id &&
      currentEntry?.isAgreed
    ) {
      setEntries([
        ...entries?.filter((item) => item?.id !== currentEntry?.id),
        currentEntry,
      ]);
      enqueueSnackbar("Successfully updated", { variant: "success" });
    }
  };

  useEffect(() => {
    setCurrentEntry(entries?.filter((item) => item?.id === id)[0]);
  }, [id]);

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <div className="mt-3">
          {/* modal */}
          <div
            class="modal modal-lg fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Update details
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
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
                          value={currentEntry?.name}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        for="inputPassword3"
                        className="col-sm-2 col-form-label"
                      >
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
                                                selected={
                                                  sub_item?.id ===
                                                  currentEntry?.sector?.id
                                                }
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
                                                        selected={
                                                          sub_sub_item?.id ===
                                                          currentEntry?.sector
                                                            ?.id
                                                        }
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
                                            selected={
                                              sub_item?.id ===
                                              currentEntry?.sector?.id
                                            }
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
                            checked={currentEntry?.isAgreed}
                          />
                          <label className="form-check-label" for="gridCheck1">
                            Agree to terms
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary px-4"
                      disabled={
                        !(
                          currentEntry &&
                          currentEntry?.name &&
                          currentEntry?.sector?.id &&
                          currentEntry?.isAgreed
                        )
                      }
                    >
                      Save
                    </button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {/* <button type="button" class="btn btn-primary">
                    Save changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* modal ends */}
        </div>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default UpdateEntryModal;
