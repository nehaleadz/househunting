'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

var _simpleReactForm = require('simple-react-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes);

var defaultProps = {};

var CheckboxComponent = function (_React$Component) {
  _inherits(CheckboxComponent, _React$Component);

  function CheckboxComponent() {
    _classCallCheck(this, CheckboxComponent);

    return _possibleConstructorReturn(this, (CheckboxComponent.__proto__ || Object.getPrototypeOf(CheckboxComponent)).apply(this, arguments));
  }

  _createClass(CheckboxComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: { paddingTop: 10, paddingBottom: 10 } },
        _react2.default.createElement(_Checkbox2.default, _extends({
          label: this.props.label,
          disabled: this.props.disabled,
          checked: this.props.value,
          onCheck: function onCheck() {
            return _this2.props.onChange(!_this2.props.value);
          }
        }, this.props.passProps)),
        _react2.default.createElement(
          'span',
          { style: { color: Colors.red500 } },
          this.props.errorMessage
        )
      );
    }
  }]);

  return CheckboxComponent;
}(_react2.default.Component);

exports.default = CheckboxComponent;


CheckboxComponent.propTypes = propTypes;
CheckboxComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'checkbox',
  component: CheckboxComponent
});

(0, _simpleReactForm.registerType)({
  type: 'boolean',
  component: CheckboxComponent
});