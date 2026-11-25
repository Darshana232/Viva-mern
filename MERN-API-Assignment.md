# MERN Practical Assignment — Campus Event Registration API

**Duration:** 30 minutes | **Difficulty:** Easy–Intermediate | **Total:** 100 marks

## Problem statement

Your college is organising technical events. Build a REST API that lets students register for events, view registrations and cancel a registration.

Use Node.js, Express.js, MongoDB and Mongoose. No React frontend or authentication is required.

## 1. Database model

Create a `Registration` model.

| Field | Type | Constraint |
|---|---|---|
| studentName | String | Required, non-empty |
| email | String | Required, non-empty |
| eventName | String | Required, non-empty |
| status | String | registered or cancelled; default registered |
| createdAt | Date | Automatically generated |

MongoDB should generate the document ID.

## 2. API requirements

### A. Register for an event

**POST /api/registrations**

Sample request:

```json
{
  "studentName": "Rahul Sharma",
  "email": "rahul@example.com",
  "eventName": "Hackathon"
}
```

- Validate all three required fields.
- Set status to registered on the server.
- Reject an active registration with the same email and event name.
- A student may register for different events or register again after cancellation.
- Return 201 with the saved registration, 400 for invalid input, or 409 for a duplicate active registration.

### B. Fetch registrations

**GET /api/registrations**

Support optional query parameters:

- `GET /api/registrations` — all registrations.
- `GET /api/registrations?eventName=Hackathon` — filter by event.
- `GET /api/registrations?status=registered` — filter by status.
- `GET /api/registrations?eventName=Hackathon&status=registered` — apply both filters.

Return 200 with an array (empty if no matches). Return 400 for an unsupported status filter. Exact string matching is sufficient.

### C. Cancel a registration

**PATCH /api/registrations/:id/cancel**

No request body is required.

- Find the registration by its MongoDB ID.
- Change its status to cancelled without deleting it.
- Return 200 with the updated registration.
- Return 400 for an invalid ID or an already cancelled registration.
- Return 404 for a valid ID that does not exist.

## 3. Test cases

| Scenario | Expected status |
|---|---|
| Register with valid data | 201 |
| Register with a missing required field | 400 |
| Repeat the same active registration | 409 |
| Register the same email for another event | 201 |
| Fetch all or filtered registrations | 200 |
| Cancel an active registration | 200 |
| Cancel the same registration again | 400 |
| Cancel a nonexistent registration with a valid ID | 404 |
| Cancel using an invalid ID | 400 |
| Register again after cancellation | 201 |

Return a meaningful JSON error message for failures and 500 for unexpected server errors.

## 4. Evaluation criteria

| Component | Marks |
|---|---:|
| Express and MongoDB setup | 10 |
| Mongoose schema | 15 |
| Registration API | 30 |
| Fetching and filtering API | 20 |
| Cancellation API | 15 |
| Validation and error handling | 10 |
| **Total** | **100** |

## 5. Submission instructions

- Use MongoDB for persistence; do not use an in-memory array.
- Demonstrate all three endpoints using Postman or an equivalent API client.
- Keep database credentials out of source code.
- Submit working backend code. No frontend is required.

Assume Node.js and access to a working MongoDB instance are already available. Focus on functionality rather than elaborate folder structure.
