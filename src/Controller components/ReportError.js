import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useGame } from "../Models/gameList/GameListContext";
import { useAdmin } from "../Models/admin/AdminContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function ReportError() {
  const { dropdownList } = useGame();
  const { submitError } = useAdmin();

  const [dropDownValue, setDropDownValue] = useState("");
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity() === true) {
      setValidated(true);
      try {
        setSubmitting(true);
        submitError(e);
        setSubmitted(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleOnChange(e) {
    setDropDownValue(e.target.value);
  }

  return (
    <Container>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Problem Source:</Form.Label>
          <Form.Select value={dropDownValue} onChange={handleOnChange} required>
            <option value="">Please make a selection</option>
            {Object.values(dropdownList).map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
            <option key="99" value="Other">
              Other
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Describe Problem:</Form.Label>
          <Form.Control required as="textarea" rows={3} />
        </Form.Group>
        <Button
          as="input"
          type="submit"
          disabled={submitting}
          value="Submit Report"
          variant="dark"
        />
        {submitted && (
          <div>
            <Form.Text className="text-muted">
              Report submitted successfully!
            </Form.Text>
          </div>
        )}
      </Form>
    </Container>
  );
}
