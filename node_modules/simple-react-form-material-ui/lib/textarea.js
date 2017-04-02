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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({
  changeOnKeyDown: _react2.default.PropTypes.bool
}, _simpleReactForm.FieldType.propTypes);

var defaultProps = {
  changeOnKeyDown: false
};

var TextareaComponent = function (_React$Component) {
  _inherits(TextareaComponent, _React$Component);

  function TextareaComponent(props) {
    _classCallCheck(this, TextareaComponent);

    var _this = _possibleConstructorReturn(this, (TextareaComponent.__proto__ || Object.getPrototypeOf(TextareaComponent)).call(this, props));

    _this.state = { value: props.value };
    return _this;
  }

  _createClass(TextareaComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.keyCode === 13) {
        this.props.onChange(event.target.value);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      if (this.props.onBlur) {
        this.props.onBlur();
      }
      this.props.onChange(this.state.value);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.setState({ value: event.target.value });
      if (this.props.changeOnKeyDown) {
        this.props.onChange(event.target.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_TextField2.default, _extends({
        ref: 'input',
        fullWidth: true,
        multiLine: true,
        value: this.state.value || '',
        floatingLabelText: this.props.useHint ? null : this.props.label,
        hintText: this.props.useHint ? this.props.label : null,
        errorText: this.props.errorMessage,
        disabled: this.props.disabled,
        onChange: this.onChange.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: this.onBlur.bind(this)
      }, this.props.passProps));
    }
  }]);

  return TextareaComponent;
}(_react2.default.Component);

exports.default = TextareaComponent;


TextareaComponent.propTypes = propTypes;
TextareaComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'textarea',
  component: TextareaComponent
});