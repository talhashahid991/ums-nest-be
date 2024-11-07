// USER TYPE IDs
export const LID_SUPER_ADMIN_ID = 1;
export const LID_ADMIN_ID = 2;
export const LID_EDITOR_ID = 3;
export const LID_AUTHOR_ID = 4;
export const LID_CONTRIBUTOR_ID = 5;
export const LID_SUBSCRIBER_ID = 6;
export const LID_TEMP_ID = 7;

// USER TYPE LABELS
export const LID_SUPER_ADMIN_LABEL = 'Super Admin';
export const LID_ADMIN_LABEL = 'Admin';
export const LID_EDITOR_LABEL = 'Editor';
export const LID_AUTHOR_LABEL = 'Author';
export const LID_CONTRIBUTOR_LABEL = 'Contributor';
export const LID_SUBSCRIBER_LABEL = 'Subscriber';
export const LID_TEMP_LABEL = 'Temp';

// GENDER TYPES
export const LID_MALE_ID = 8;
export const LID_FEMALE_ID = 9;
export const LID_OTHER_ID = 10;

// STATUS TYPES
export const LID_ACTIVE_ID = 11;
export const LID_INACTIVE_ID = 12;

// APPROVAL STATUS TYPES
export const LID_DRAFT_ID = 13;
export const LID_SUBMITTED_ID = 14;
export const LID_IN_PROCESS_ID = 15;
export const LID_ON_HOLD_ID = 16;
export const LID_APPROVED_ID = 17;
export const LID_REJECTED_ID = 18;

// DML STATUSES
export const LID_CREATED_ID = 19;
export const LID_DELETE_ID = 20;
export const LID_UPDATE_ID = 21;

// VERIFICATION STATUSES
export const LID_VERIFIED_ID = 22;
export const LID_NOT_VERIFIED_ID = 23;

// API CODES
export const API_SUCCESS_CODE = 200;
export const API_ACCESPTED_CODE = 202;
export const API_NO_CONTENT_CODE = 204;
export const API_ERROR_CODE = 400;
export const API_UNAUTHORIZED_CODE = 401;
export const API_FORBIDDEN_CODE = 403;
export const API_NOT_FOUND_CODE = 404;
export const API_METHOD_NOT_ALLOWED_CODE = 405;
export const API_REQUEST_TIMEOUT_CODE = 408;
export const API_INTERNAL_SERVER_ERROR_CODE = 500;
export const API_SERVICE_UNAVAILABLE_CODE = 503;

// API MESSAGES
export const API_SUCCESS_MESSAGE = 'SUCCESS';
export const API_ACCESPTED_MESSAGE = 'ACCEPTED';
export const API_NO_CONTENT_MESSAGE = 'NO_CONTENT';
export const API_ERROR_MESSAGE = 'ERROR';
export const API_UNAUTHORIZED_MESSAGE = 'UNAUTHORISED';
export const API_FORBIDDEN_MESSAGE = 'FORBIDDEN';
export const API_NOT_FOUND_MESSAGE = 'No record found';
export const API_METHOD_NOT_ALLOWED_MESSAGE = 'METHOD_NOT_ALLOWED';
export const API_REQUEST_TIMEOUT_MESSAGE = 'REQUEST_TIMEOUT';
export const API_INTERNAL_SERVER_ERROR_MESSAGE = 'INTERNAL_SERVER_ERROR';
export const API_SERVICE_UNAVAILABLE_MESSAGE = 'SERVICE_UNAVAILABLE';

// MESSAGES
export const INVALID_CREDENTIALS = 'Invalid credentials';
export const UNVERIFIED_EMAIL = 'Verify your email before proceeding';
export const EMAIL_IN_USE = 'Email is already in use';
export const USERNAME_IN_USE = 'Username is already in use';
export const RECORD_EXISTS = 'Record already exists';
export const TRY_AGAIN_LATER = 'Kindly try again later';

// LOGIN CASES
export const LC_VERIFIED = 'VERIFIED';
export const LC_OTP = 'OTP';
