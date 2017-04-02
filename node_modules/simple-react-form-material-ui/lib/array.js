'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _simpleReactForm = require('simple-react-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  label: {
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 5,
    fontSize: 12
  }
};

var propTypes = _extends({}, _simpleReactForm.ArrayComponent.propTypes, {
  parentClassName: _react2.default.PropTypes.string,
  childrenClassName: _react2.default.PropTypes.string,
  useSmallSpace: _react2.default.PropTypes.bool,
  smallRemoveButtonTooltipPosition: _react2.default.PropTypes.string
});

var defaultProps = _extends({}, _simpleReactForm.ArrayComponent.defaultProps, {
  childrenClassName: '',
  parentClassName: '',
  useSmallSpace: false,
  smallRemoveButtonTooltipPosition: 'bottom-center'
});

var MaterialArray = function (_ArrayComponent) {
  _inherits(MaterialArray, _ArrayComponent);

  function MaterialArray() {
    _classCallCheck(this, MaterialArray);

    return _possibleConstructorReturn(this, (MaterialArray.__proto__ || Object.getPrototypeOf(MaterialArray)).apply(this, arguments));
  }

  _createClass(MaterialArray, [{
    key: 'renderChildrenItem',
    value: function renderChildrenItem(_ref) {
      var index = _ref.index,
          children = _ref.children;

      if (this.props.useSmallSpace) return this.renderChildrenSmallItem({ index: index, children: children });
      return _react2.default.createElement(
        'div',
        { className: this.props.childrenClassName, key: this.props.fieldName + '.' + index },
        _react2.default.createElement(
          _Paper2.default,
          { style: { marginTop: 20, marginBottom: 20, padding: 20 } },
          this.renderChildrenItemWithContext({ index: index, children: children }),
          _react2.default.createElement(
            'div',
            { style: { marginTop: 10, textAlign: 'right' } },
            this.renderRemoveButton(index)
          )
        )
      );
    }
  }, {
    key: 'renderChildrenSmallItem',
    value: function renderChildrenSmallItem(_ref2) {
      var index = _ref2.index,
          children = _ref2.children;

      return _react2.default.createElement(
        'div',
        { className: this.props.childrenClassName, key: this.props.fieldName + '.' + index, style: { marginTop: 10, marginBottom: 10, display: 'flex' } },
        _react2.default.createElement(
          'div',
          { style: { flexBasis: '90%', maxWidth: '90%' } },
          this.renderChildrenItemWithContext({ index: index, children: children })
        ),
        _react2.default.createElement(
          'div',
          { style: { flexBasis: '10%', maxWidth: '10%', marginTop: 20, textAlign: 'right' } },
          this.renderSmallRemoveButton(index)
        )
      );
    }
  }, {
    key: 'renderRemoveButton',
    value: function renderRemoveButton(index) {
      var _this2 = this;

      if (this.props.disabled) return;
      return _react2.default.createElement(_RaisedButton2.default, { label: this.props.removeLabel, onTouchTap: function onTouchTap() {
          return _this2.removeItem(index);
        } });
    }
  }, {
    key: 'renderSmallRemoveButton',
    value: function renderSmallRemoveButton(index) {
      var _this3 = this;

      if (this.props.disabled) return;
      return _react2.default.createElement(
        _IconButton2.default,
        {
          iconClassName: 'material-icons',
          onTouchTap: function onTouchTap() {
            return _this3.removeItem(index);
          },
          tooltip: this.props.removeLabel,
          tooltipPosition: this.props.smallRemoveButtonTooltipPosition
        },
        'clear'
      );
    }
  }, {
    key: 'renderAddButton',
    value: function renderAddButton() {
      var _this4 = this;

      if (!this.props.showAddButton) return;
      if (this.props.disabled) return;
      if (this.props.useSmallSpace) return this.renderSmallAddButton();
      return _react2.default.createElement(_RaisedButton2.default, { label: this.props.addLabel, onTouchTap: function onTouchTap() {
          return _this4.addItem();
        } });
    }
  }, {
    key: 'renderSmallAddButton',
    value: function renderSmallAddButton() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { style: { textAlign: 'right' } },
        _react2.default.createElement(
          _IconButton2.default,
          {
            iconClassName: 'material-icons',
            onTouchTap: function onTouchTap() {
              return _this5.addItem();
            },
            tooltip: this.props.addLabel
          },
          'add'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { marginTop: 20 } },
        _react2.default.createElement(
          'div',
          { style: styles.label },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { style: { color: 'red' } },
          this.props.errorMessage
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.parentClassName },
          this.renderChildren()
        ),
        _react2.default.createElement(
          'div',
          { style: { marginTop: 10 } },
          this.renderAddButton()
        )
      );
    }
  }]);

  return MaterialArray;
}(_simpleReactForm.ArrayComponent);

exports.default = MaterialArray;


MaterialArray.propTypes = propTypes;
MaterialArray.defaultProps = defaultProps;