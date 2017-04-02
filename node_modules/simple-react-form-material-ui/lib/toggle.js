'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _simpleReactForm = require('simple-react-form');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes);

var defaultProps = {};

var ToggleComponent = function (_React$Component) {
  _inherits(ToggleComponent, _React$Component);

  function ToggleComponent() {
    _classCallCheck(this, ToggleComponent);

    return _possibleConstructorReturn(this, (ToggleComponent.__proto__ || Object.getPrototypeOf(ToggleComponent)).apply(this, arguments));
  }

  _createClass(ToggleComponent, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Toggle2.default, _extends({
          label: this.props.label,
          defaultToggled: !!this.props.value,
          disabled: this.props.disabled,
          onToggle: function onToggle() {
            return _this2.props.onChange(!_this2.props.value);
          }
        }, this.props.passProps)),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.errorMessage },
          this.props.errorMessage
        )
      );
    }
  }]);

  return ToggleComponent;
}(_react2.default.Component);

exports.default = ToggleComponent;


ToggleComponent.propTypes = propTypes;
ToggleComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'toggle',
  component: ToggleComponent
});