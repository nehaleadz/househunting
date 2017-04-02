'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _simpleReactForm = require('simple-react-form');

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = _extends({}, _simpleReactForm.FieldType.propTypes, {
  /**
   * Allow to select multiple items.
   */
  multi: _react2.default.PropTypes.bool,
  /**
   * Meteor method that recieves the search string and returns an array of items
   * with 'label' and 'value' attributes.
   */
  methodName: _react2.default.PropTypes.string.isRequired,
  /**
   * Meteor method that recieves the value and must return the label. If
   * ```multi``` is set to true, it will recieve an array and it must return an
   * with the labels in the same order.
   */
  labelMethodName: _react2.default.PropTypes.string.isRequired,
  /**
   * A Meteor connection.
   */
  connection: _react2.default.PropTypes.any,
  /**
   * Time with no changes that activates the search.
   */
  waitTime: _react2.default.PropTypes.number,
  /**
   * A function that creates a document and pass the value in a callback
   */
  create: _react2.default.PropTypes.func,
  /**
   * A function that returns the create label
   */
  createLabel: _react2.default.PropTypes.func,
  /**
   * A function that returns if a value can be created
   */
  canCreate: _react2.default.PropTypes.func
});

var defaultProps = {
  multi: false,
  waitTime: 400,
  createLabel: function createLabel(search) {
    return 'Create \'' + search + '\'';
  },
  canCreate: function canCreate() {
    return true;
  }
};

var SelectWithMethodComponent = function (_React$Component) {
  _inherits(SelectWithMethodComponent, _React$Component);

  function SelectWithMethodComponent(props) {
    _classCallCheck(this, SelectWithMethodComponent);

    var _this = _possibleConstructorReturn(this, (SelectWithMethodComponent.__proto__ || Object.getPrototypeOf(SelectWithMethodComponent)).call(this, props));

    _this.state = {
      dataSource: [],
      selected: null,
      items: [],
      knownItems: [],
      response: [],
      isFetchingData: false,
      isFetchingLabel: false,
      hasTitleFor: null,
      searchText: ''
    };

    _this.debouncedSearch = _underscore2.default.debounce(_this.search.bind(_this), _this.props.waitTime);
    return _this;
  }

  _createClass(SelectWithMethodComponent, [{
    key: 'isLoading',
    value: function isLoading() {
      return this.state.isFetchingData || this.state.isFetchingLabel;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateLabel(this.props.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('will recieve props', nextProps)
      if (this.props.value !== nextProps.value && nextProps.value) {
        this.updateLabel(nextProps.value);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.searchText !== this.refs.input.state.searchText) {
        this.refs.input.setState({ searchText: this.state.searchText });
      }
    }
  }, {
    key: 'updatedSelectedItems',
    value: function updatedSelectedItems(values) {
      var _this2 = this;

      var missingLabels = [];
      var knownItems = this.state.knownItems;
      var valueArray = _underscore2.default.isArray(values) ? values : [values];

      if (!values) return;

      valueArray.map(function (value) {
        if (!_this2.state.knownItems[value]) {
          missingLabels.push(value);
        }
      });

      if (missingLabels.length > 0) {
        var labelMethodName = this.props.labelMethodName;
        var connection = this.props.connection || global.Meteor;
        var labelsMethod = this.props.multi ? missingLabels : missingLabels[0];
        this.setState({ isFetchingLabel: true });
        connection.call(labelMethodName, labelsMethod, function (error, response) {
          _this2.setState({ isFetchingLabel: false });
          if (error) {
            console.log('[select-with-method] Recieved error from \'' + labelMethodName + '\'', error);
          } else {
            if (_this2.props.multi) {
              missingLabels.map(function (value, index) {
                if (_underscore2.default.isString(response[index])) {
                  knownItems[value] = { label: response[index] };
                } else {
                  knownItems[value] = response[index];
                }
              });
            } else {
              if (_underscore2.default.isString(response)) {
                knownItems[labelsMethod] = { label: response };
              } else {
                knownItems[labelsMethod] = response;
              }
              // console.log('setting to response', response)
              _this2.setState({ searchText: knownItems[labelsMethod].label });
            }

            _this2.setState({ knownItems: knownItems });
          }
        });
      } else {
        if (!this.props.multi) {
          // console.log('setting to known label', knownItems[values])
          this.setState({ searchText: knownItems[values] });
        }
      }
    }
  }, {
    key: 'updateLabel',
    value: function updateLabel(value) {
      if (!this.props.multi && !value) {
        // console.log('clean on update')
        this.setState({ searchText: '' });
        return;
      }

      this.updatedSelectedItems(value);
    }
  }, {
    key: 'search',
    value: function search(text) {
      var _this3 = this;

      // console.log('searching with text', text)
      this.setState({ selected: null, isFetchingData: true });

      if (!this.props.multi) {
        this.props.onChange(null);
      }

      var methodName = this.props.methodName;
      var connection = this.props.connection || global.Meteor;
      connection.call(methodName, text, function (error, response) {
        _this3.setState({ isFetchingData: false });
        if (error) {
          console.log('[select-with-method] Recieved error from \'' + methodName + '\'', error);
        } else {
          response = response || [];
          _this3.setState({ response: response });
          var dataSource = response.map(function (item) {
            return {
              text: item.value,
              value: _react2.default.createElement(_MenuItem2.default, { primaryText: item.label })
            };
          });
          if (_underscore2.default.isFunction(_this3.props.create) && text && _this3.props.canCreate(text)) {
            dataSource.push({
              text: text,
              value: _react2.default.createElement(_MenuItem2.default, { primaryText: _this3.props.createLabel(text) })
            });
          }
          _this3.setState({ dataSource: dataSource });
        }
      });
    }
  }, {
    key: 'onUpdateText',
    value: function onUpdateText(text) {
      this.setState({ searchText: text, isFetchingData: true });
      this.debouncedSearch(text);
    }
  }, {
    key: 'createItem',
    value: function createItem(item) {
      var _this4 = this;

      this.props.create(item.text, function (value) {
        if (_this4.props.multi) {
          setTimeout(function () {
            _this4.setState({ searchText: '' });
          }, 101);
          if (_underscore2.default.contains(_this4.props.value || [], value)) {
            return;
          }
          _this4.props.onChange(_underscore2.default.union(_this4.props.value || [], [value]));
        } else {
          _this4.props.onChange(value);
        }
      });
    }
  }, {
    key: 'onItemSelected',
    value: function onItemSelected(item, index) {
      var _this5 = this;

      if (index === this.state.response.length && _underscore2.default.isFunction(this.props.create)) {
        return this.createItem(item);
      }
      var selected = this.state.response[index];
      if (this.props.multi) {
        // console.log('clean on item selected')
        setTimeout(function () {
          _this5.setState({ searchText: '' });
        }, 101);
        if (_underscore2.default.contains(this.props.value || [], selected.value)) return;
        this.props.onChange(_underscore2.default.union(this.props.value || [], [selected.value]));
      } else {
        this.props.onChange(selected ? selected.value : null);
        setTimeout(function () {
          _this5.setState({ searchText: selected.label });
        }, 101);
      }

      if (selected) {
        this.state.knownItems[selected.value] = selected;
        this.setState({ knownItems: this.state.knownItems });
      }
    }
  }, {
    key: 'removeItem',
    value: function removeItem(value) {
      this.props.onChange(_underscore2.default.without(this.props.value || [], value));
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (!this.props.multi && !this.props.value) {
        this.search('');
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({ open: false });
      if (!this.props.value) {
        this.setState({ searchText: '' });
      }

      if (this.state.searchText !== this.refs.input.state.searchText) {
        // console.log('did blur, not equal')
        this.refs.input.setState({ searchText: this.state.searchText });
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this6 = this;

      return (_underscore2.default.isArray(this.props.value) ? this.props.value : []).map(function (value, index) {
        var item = _this6.state.knownItems[value] || 'Loading...';
        var label = item.label;
        var image = item.image;
        var initials = item.initials || undefined;
        var color = item.color;
        var textColor = color ? Colors.white : Colors.grey900;
        var icon = item.icon ? _react2.default.createElement(
          _FontIcon2.default,
          { className: 'material-icons' },
          item.icon
        ) : null;
        var avatar = null;
        if (initials || icon || image) {
          avatar = _react2.default.createElement(
            _Avatar2.default,
            { src: image, size: 32, icon: icon, color: Colors.blue200, backgroundColor: Colors.blue600 },
            initials
          );
        }
        return _react2.default.createElement(
          _Chip2.default,
          {
            onRequestDelete: function onRequestDelete() {
              return _this6.removeItem(value);
            },
            key: value,
            labelColor: textColor,
            style: { marginBottom: 3 },
            backgroundColor: color },
          avatar,
          label
        );
      });
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      if (!this.isLoading()) return;
      return;

      /* return (
        <CircularProgress
          style={{float: 'right', marginTop: -55, marginRight: -6}}
          size={0.4} />
      ) */
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AutoComplete2.default, _extends({
          ref: 'input',
          fullWidth: true,
          searchText: '',
          dataSource: this.state.dataSource,
          filter: _AutoComplete2.default.noFilter,
          onUpdateInput: this.onUpdateText.bind(this),
          floatingLabelText: this.props.useHint ? null : this.props.label,
          hintText: this.props.useHint ? this.props.label : null,
          onNewRequest: this.onItemSelected.bind(this),
          errorText: this.props.errorMessage,
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this),
          open: this.state.open,
          openOnFocus: true,
          disabled: this.props.disabled,
          menuCloseDelay: 100
        }, this.props.passProps)),
        this.renderLoading(),
        _react2.default.createElement(
          'div',
          null,
          this.renderItems()
        )
      );
    }
  }]);

  return SelectWithMethodComponent;
}(_react2.default.Component);

exports.default = SelectWithMethodComponent;


SelectWithMethodComponent.propTypes = propTypes;
SelectWithMethodComponent.defaultProps = defaultProps;

(0, _simpleReactForm.registerType)({
  type: 'select-with-method',
  component: SelectWithMethodComponent
});