'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _simpleReactForm = require('simple-react-form');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes);

var defaultProps = {};

var StringArrayComponent = function (_React$Component) {
  _inherits(StringArrayComponent, _React$Component);

  function StringArrayComponent(props) {
    _classCallCheck(this, StringArrayComponent);

    var _this = _possibleConstructorReturn(this, (StringArrayComponent.__proto__ || Object.getPrototypeOf(StringArrayComponent)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(StringArrayComponent, [{
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.keyCode === 13) {
        this.addItem();
      }
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      if (!this.state.value) return;
      var value = this.props.value || [];
      value.push(this.state.value);
      this.props.onChange(value);
      this.setState({ value: '' });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(value) {
      var newValue = _underscore2.default.without(this.props.value, value);
      this.props.onChange(newValue);
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      return (this.props.value || []).map(function (value, index) {
        return _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return _this2.removeItem(value);
            }, key: index, style: _styles2.default.tag },
          value
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TextField2.default, _extends({
          ref: 'input',
          fullWidth: true,
          value: this.state.value,
          floatingLabelText: this.props.useHint ? null : this.props.label,
          hintText: this.props.useHint ? this.props.label : null,
          errorText: this.props.errorMessage,
          disabled: this.props.disabled,
          onChange: function onChange(event) {
            return _this3.setState({ value: event.target.value });
          },
          onKeyDown: this.onKeyDown.bind(this),
          onBlur: this.addItem.bind(this)
        }, this.props.passProps)),
        this.renderItems()
      );
    }
  }]);

  return StringArrayComponent;
}(_react2.default.Component);

exports.default = StringArrayComponent;


StringArrayComponent.propTypes = propTypes;
StringArrayComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'string-array',
  component: StringArrayComponent
});

(0, _simpleReactForm.registerType)({
  type: 'tags',
  component: StringArrayComponent
});