'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleReactForm = require('simple-react-form');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _uploadButton = require('./upload-button');

var _uploadButton2 = _interopRequireDefault(_uploadButton);

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes, {
  /**
   * A function that recieves { file, onProgress, onReady, onError }.
   * onProgress input is progress, a number from 0 to 1.
   * onReady inputs are { url, meta },
   *    url is the url of the file, meta is a object with whatever you want.
   * onError input is message.
   */
  upload: _react2.default.PropTypes.func.isRequired,

  /**
   * A function that recieves { file, onReady, onError }.
   * file is the information of the file (includes the meta from before).
   * onReady is a function with no input.
   * onError input is message.
   */
  delete: _react2.default.PropTypes.func,

  /**
   * A mime type to match to accept the files.
   * If image prop is set and image prop is also set, this mime type is going to stay.
   * If this prop is not set and image prop is, the mime type will be 'image/*'
   */
  accept: _react2.default.PropTypes.string,

  /**
   * Only accept images
   */
  image: _react2.default.PropTypes.bool,

  /**
   * Accept multiple files. If you are using simple-schema and this is true,
   * you must set [Object] to the type.
   */
  multi: _react2.default.PropTypes.bool,

  /**
   * Pass the styles props to the preview
   */
  previewStyles: _react2.default.PropTypes.object,

  /**
   * This delete the files that are not used
   */
  deleteNotUsedFiles: _react2.default.PropTypes.bool,

  /**
   * The label of the button
   */
  uploadLabel: _react2.default.PropTypes.any,

  /**
   * The label of the delete button
   */
  deleteLabel: _react2.default.PropTypes.any,

  /**
   * The text that is shown when deleting
   */
  confirmDeleteText: _react2.default.PropTypes.any
});

var defaultProps = {
  accept: false,
  image: false,
  multi: false,
  previewStyles: {},
  deleteLabel: 'Delete',
  confirmDeleteText: 'Do you want to delete this file?',
  delete: function _delete(_ref) {
    var file = _ref.file,
        onReady = _ref.onReady,
        onError = _ref.onError;
    return onReady();
  }
};

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    _this.state = {};
    _this.uploads = [];
    _this.toDelete = [];
    _this.limbo = [];

    /* $(window).unload(() => { This will be deactivated until better implementation is made
      this.componentWillUnmount()
    }) */
    return _this;
  }

  _createClass(Component, [{
    key: 'onSuccess',
    value: function onSuccess() {
      var _this2 = this;

      this.toDelete.map(function (file) {
        _this2.props.delete({
          file: file,
          onReady: function onReady() {},

          onError: function onError(message) {
            alert(message);
          }
        });
      });
      this.toDelete = [];
      this.limbo = [];
    }
  }, {
    key: 'onError',
    value: function onError(message) {
      // Todo something here
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      if (!this.limbo.length) return;
      if (this.props.hasOwnProperty('deleteNotUsedFiles')) {
        if (!this.props.deleteNotUsedFiles) {
          return;
        }
      } else {
        if (this.props.form.props.hasOwnProperty('onChange')) {
          return;
        }
      }

      this.limbo.map(function (file) {
        _this3.props.delete({
          file: file,
          onReady: function onReady() {},

          onError: function onError(message) {
            alert(message);
          }
        });
      });
    }
  }, {
    key: 'onReady',
    value: function onReady(upload, file) {
      if (this.props.multi) {
        var newValue = _underscore2.default.clone(this.props.value) || [];
        newValue.push(file);
        this.props.onChange(newValue);
      } else {
        this.props.onChange(file);
      }
      this.limbo.push(file);
    }
  }, {
    key: 'startUpload',
    value: function startUpload(file, base64) {
      var _this4 = this;

      var upload = {
        key: _underscore2.default.uniqueId('uploadComponent'),
        file: file,
        base64: base64,
        isUploading: true
      };
      this.uploads.push(upload);
      this.forceUpdate();

      this.props.upload({
        file: file,
        onProgress: function onProgress(progress) {
          upload.progress = progress;
          _this4.forceUpdate();
        },

        onReady: function onReady(_ref2) {
          var url = _ref2.url,
              meta = _ref2.meta;

          _this4.onReady(upload, { url: url, meta: meta });
          var index = _this4.uploads.indexOf(upload);
          _this4.uploads.splice(index, 1);
          _this4.forceUpdate();
        },

        onError: function onError(message) {
          _this4.onError(upload, message);
          upload.isUploading = false;
          upload.error = message;
          _this4.forceUpdate();
        }
      });
    }
  }, {
    key: 'deleteFile',
    value: function deleteFile(file) {
      this.toDelete.push(_underscore2.default.clone(file));
      if (this.props.multi) {
        var value = _underscore2.default.clone(this.props.value);
        var index = value.indexOf(file);
        value.splice(index, 1);
        this.props.onChange(value);
      } else {
        this.props.onChange(null);
      }
    }
  }, {
    key: 'renderPreviews',
    value: function renderPreviews() {
      var _this5 = this;

      var uploadingPreviews = this.uploads.map(function (upload, index) {
        return _react2.default.createElement(_preview2.default, {
          key: upload.key,
          styles: _this5.props.previewStyles,
          base64: upload.base64,
          file: upload.file,
          isUploading: upload.isUploading,
          progress: upload.progress,
          isImage: !!_this5.props.image,
          onDelete: function onDelete() {
            return _this5.deleteFile(upload.file);
          } });
      });

      var value = this.props.multi ? this.props.value || [] : this.props.value ? [this.props.value] : [];
      var previews = value.map(function (file, index) {
        return _react2.default.createElement(_preview2.default, {
          key: 'preview-' + file.url,
          styles: _this5.props.previewStyles,
          url: file.url,
          isImage: !!_this5.props.image,
          deleteLabel: _this5.props.deleteLabel,
          confirmDeleteText: _this5.props.confirmDeleteText,
          onDelete: function onDelete() {
            return _this5.deleteFile(file);
          }
        });
      });

      return _react2.default.createElement(
        'div',
        null,
        previews,
        uploadingPreviews
      );
    }
  }, {
    key: 'renderUploadButton',
    value: function renderUploadButton() {
      if (!this.props.multi && (this.props.value || this.uploads.length)) return;
      var props = {
        accept: this.props.accept ? this.props.accept : this.props.image ? 'image/*' : '',
        label: this.props.image ? this.props.uploadLabel || 'Upload image' : this.props.uploadLabel || 'Upload file',
        multi: !!this.props.multi,
        onUpload: this.startUpload.bind(this),
        passBase64: !!this.props.image
      };
      return _react2.default.createElement(_uploadButton2.default, props);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { paddingTop: 10, paddingBottom: 10 } },
        _react2.default.createElement(
          'div',
          { style: _styles2.default.label },
          this.props.label
        ),
        this.renderPreviews(),
        this.renderUploadButton(),
        _react2.default.createElement(
          'div',
          { style: _styles2.default.errorMessage },
          this.props.errorMessage
        )
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

exports.default = Component;


Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'file',
  component: Component
});