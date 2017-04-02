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

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes, {
  /**
   * The options for the checkbox.
   */
  options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string.isRequired,
    disabled: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
    description: _react2.default.PropTypes.string
  })).isRequired
});

var defaultProps = {};

var MultipleCheckboxComponent = function (_React$Component) {
  _inherits(MultipleCheckboxComponent, _React$Component);

  function MultipleCheckboxComponent() {
    _classCallCheck(this, MultipleCheckboxComponent);

    return _possibleConstructorReturn(this, (MultipleCheckboxComponent.__proto__ || Object.getPrototypeOf(MultipleCheckboxComponent)).apply(this, arguments));
  }

  _createClass(MultipleCheckboxComponent, [{
    key: 'onCheck',
    value: function onCheck(value, currentVal) {
      var newVal = [];
      if (_underscore2.default.contains(currentVal, value)) {
        newVal = _underscore2.default.without(currentVal, value);
      } else {
        newVal = _underscore2.default.union(currentVal, [value]);
      }

      this.props.onChange(newVal);
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var currentVal = this.props.value || [];
      return this.props.options.map(function (option) {
        return _react2.default.createElement(
          'div',
          { key: option.value, style: { marginTop: 10 } },
          _react2.default.createElement(_Checkbox2.default, _extends({
            checked: _underscore2.default.contains(currentVal, option.value),
            onCheck: function onCheck() {
              return _this2.onCheck(option.value, currentVal);
            },
            label: option.label,
            disabled: _this2.props.disabled || option.disabled
          }, _this2.props.passProps)),
          _react2.default.createElement(
            'div',
            {
              style: { marginLeft: 40, color: Colors.grey500, cursor: 'pointer' },
              onClick: function onClick() {
                return _this2.onCheck(option.value, currentVal);
              } },
            (option.description || '').split('\n').map(function (text, index) {
              return _react2.default.createElement(
                'div',
                { key: index },
                text
              );
            })
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: _styles2.default.fieldContainer },
        _react2.default.createElement(
          'div',
          { style: _styles2.default.mirrorLabel },
          this.props.label
        ),
        this.renderOptions(),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.errorMessage },
          this.props.errorMessage
        )
      );
    }
  }]);

  return MultipleCheckboxComponent;
}(_react2.default.Component);

exports.default = MultipleCheckboxComponent;


MultipleCheckboxComponent.propTypes = propTypes;
MultipleCheckboxComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'multiple-checkbox',
  component: MultipleCheckboxComponent
});