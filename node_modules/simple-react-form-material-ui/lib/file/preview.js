'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  image: {
    marginBottom: 10,
    marginRight: 10,
    cursor: 'pointer',
    display: 'inline-block',
    maxHeight: 150,
    maxWidth: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
  },
  imageLoading: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
    opacity: 0.5
  },
  progress: {
    margin: '0 auto',
    display: 'block',
    marginTop: -50
  }
};

var propTypes = {
  base64: _react2.default.PropTypes.string,
  url: _react2.default.PropTypes.string,
  isImage: _react2.default.PropTypes.bool,
  isUploading: _react2.default.PropTypes.bool,
  progress: _react2.default.PropTypes.number,
  onDelete: _react2.default.PropTypes.func,
  deleteLabel: _react2.default.PropTypes.any,
  confirmDeleteText: _react2.default.PropTypes.any,
  styles: _react2.default.PropTypes.object.isRequired
};

var FilesPreview = function (_React$Component) {
  _inherits(FilesPreview, _React$Component);

  function FilesPreview() {
    _classCallCheck(this, FilesPreview);

    return _possibleConstructorReturn(this, (FilesPreview.__proto__ || Object.getPrototypeOf(FilesPreview)).apply(this, arguments));
  }

  _createClass(FilesPreview, [{
    key: 'askDelete',
    value: function askDelete() {
      if (confirm(this.props.confirmDeleteText)) {
        // we should use a react component hereº
        this.props.onDelete();
      }
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return _react2.default.createElement(
        'div',
        { style: { marginBottom: 10 } },
        _react2.default.createElement(_LinearProgress2.default, { mode: 'determinate', value: this.props.progress * 100 })
      );
    }
  }, {
    key: 'renderBase64',
    value: function renderBase64() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: this.props.base64, style: styles.imageLoading }),
        _react2.default.createElement(_CircularProgress2.default, { style: styles.progress, mode: 'determinate', value: this.props.progress * 100, size: 0.5 })
      );
    }
  }, {
    key: 'renderPreviewImage',
    value: function renderPreviewImage() {
      return _react2.default.createElement('img', {
        src: this.props.url,
        style: _extends({}, styles.image, this.props.styles),
        onClick: this.askDelete.bind(this) });
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      return _react2.default.createElement(
        'div',
        { style: { marginBottom: 10 } },
        _react2.default.createElement(
          'a',
          { style: { color: Colors.blue400 }, href: this.props.url, target: '_blank' },
          this.props.url
        ),
        _react2.default.createElement(
          'span',
          { style: { color: Colors.red400, marginLeft: 5, cursor: 'pointer' }, onClick: this.props.onDelete.bind(this) },
          this.props.deleteLabel
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isUploading) {
        if (this.props.isImage) {
          return this.renderBase64();
        } else {
          return this.renderLoading();
        }
      } else {
        if (this.props.isImage) {
          return this.renderPreviewImage();
        } else {
          return this.renderPreview();
        }
      }
    }
  }]);

  return FilesPreview;
}(_react2.default.Component);

exports.default = FilesPreview;


FilesPreview.propTypes = propTypes;