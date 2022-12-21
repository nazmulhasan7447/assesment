import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import { size } from "lodash";
import { useSnackbar } from "notistack";
import cryptoRandomString from "crypto-random-string";
import AppContext from "./context/AppContext";
import { sectors } from "./Sectors";
import UpdateEntryModal from "./EntryUpdateModal";

const UserEntries = ({ handleRemove }) => {
  const { enqueueSnackbar } = useSnackbar();

  const appContext = useContext(AppContext);
  const { entries, setEntries } = appContext || {};

  const [currentEntryId, setCurrentEntryId] = useState({});

  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <div className="mt-3">
          <h5>Entries</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Name</th>
                <th className="text-center">Sector</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {size(entries)
                ? entries?.map((entry, index) => {
                    return (
                      <tr>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{entry?.name}</td>
                        <td className="text-center">{entry?.sector?.name}</td>
                        <td className="text-center">
                          {entry?.isAgreed ? "Agreed" : "Denied"}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => setCurrentEntryId(entry?.id)}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemove(entry?.id)}
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </Table>
          {/* modal */}
          <UpdateEntryModal id={currentEntryId} />
          {/* modal ends */}
        </div>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default UserEntries;
