'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectComponent = exports.ArrayComponent = exports.Toggle = exports.File = exports.Textarea = exports.TextField = exports.Tags = exports.Select = exports.SelectWithMethod = exports.MultipleCheckbox = exports.DatePicker = exports.Radio = exports.Checkbox = undefined;

var _checkbox = require('./checkbox');

Object.defineProperty(exports, 'Checkbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_checkbox).default;
  }
});

var _radio = require('./radio');

Object.defineProperty(exports, 'Radio', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_radio).default;
  }
});

var _datePicker = require('./date-picker');

Object.defineProperty(exports, 'DatePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_datePicker).default;
  }
});

var _multipleCheckbox = require('./multiple-checkbox');

Object.defineProperty(exports, 'MultipleCheckbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_multipleCheckbox).default;
  }
});

var _selectWithMethod = require('./select-with-method');

Object.defineProperty(exports, 'SelectWithMethod', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_selectWithMethod).default;
  }
});

var _select = require('./select');

Object.defineProperty(exports, 'Select', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_select).default;
  }
});

var _tags = require('./tags');

Object.defineProperty(exports, 'Tags', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_tags).default;
  }
});

var _text = require('./text');

Object.defineProperty(exports, 'TextField', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_text).default;
  }
});

var _textarea = require('./textarea');

Object.defineProperty(exports, 'Textarea', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_textarea).default;
  }
});

var _file = require('./file');

Object.defineProperty(exports, 'File', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_file).default;
  }
});

var _toggle = require('./toggle');

Object.defineProperty(exports, 'Toggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toggle).default;
  }
});

var _simpleReactForm = require('simple-react-form');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _simpleReactForm.registerType)({
  type: 'array',
  component: _array2.default
});

(0, _simpleReactForm.registerType)({
  type: 'object',
  component: _object2.default
});

var ArrayComponent = exports.ArrayComponent = _array2.default;
var ObjectComponent = exports.ObjectComponent = _object2.default;