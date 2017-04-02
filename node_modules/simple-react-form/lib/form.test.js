'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

var _fieldType = require('./field-type');

var _fieldType2 = _interopRequireDefault(_fieldType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DummyInput = function (_FieldType) {
  _inherits(DummyInput, _FieldType);

  function DummyInput() {
    _classCallCheck(this, DummyInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DummyInput).apply(this, arguments));
  }

  _createClass(DummyInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('input', {
        value: this.props.value || '',
        onChange: function onChange(e) {
          return _this2.props.onChange(e.target.value);
        }
      });
    }
  }]);

  return DummyInput;
}(_fieldType2.default);

// since simpleSchema comes from Meteor, we need to make a stub.


var schemaStub = function () {
  function schemaStub(schema) {
    _classCallCheck(this, schemaStub);

    this._schema = schema;
  }

  _createClass(schemaStub, [{
    key: 'schema',
    value: function schema(key) {
      return this._schema[key] || {};
    }
  }, {
    key: 'label',
    value: function label(key) {
      return 'label-for-' + key;
    }
  }, {
    key: 'newContext',
    value: function newContext() {
      return this;
    }
  }]);

  return schemaStub;
}();

test('Should render by default a <form>', function () {
  var component = (0, _enzyme.shallow)(_react2.default.createElement(
    _form2.default,
    null,
    _react2.default.createElement(
      'div',
      null,
      'dummy'
    )
  ));
  expect(component.find('form').length).toBe(1);
});

test('Should not render a <form> if useFormTag is false', function () {
  var component = (0, _enzyme.shallow)(_react2.default.createElement(
    _form2.default,
    { useFormTag: false },
    _react2.default.createElement(
      'div',
      null,
      'dummy'
    )
  ));
  expect(component.find('form').length).toBe(0);
});

test('onChange should dispatch on changes', function () {
  var calls = void 0;
  var mockFn = jest.fn();
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _form2.default,
    {
      onChange: mockFn
    },
    _react2.default.createElement(_field2.default, { fieldName: 'foo', type: DummyInput })
  ));

  component.find('input').simulate('change', { target: { value: 'foobar' } });
  calls = mockFn.mock.calls[0];
  expect(mockFn.mock.calls[0][0]).toEqual({ foo: 'foobar' });

  component.find('input').simulate('change', { target: { value: 'barfoo' } });
  calls = mockFn.mock.calls[0];
  expect(calls[calls.length - 1]).toEqual({ foo: 'barfoo' });

  component.find('Form').get(0).onValueChange('bar', 'test');
  calls = mockFn.mock.calls[0];
  expect(calls[calls.length - 1]).toEqual({ bar: 'test', foo: 'barfoo' });
});

test('should render the form correctly', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _form2.default,
    null,
    _react2.default.createElement(_field2.default, { fieldName: 'foo', type: DummyInput })
  ));

  it('should render a <form>', function () {
    expect(component.find('form').length).toBe(1);
  });

  it('should render the <Field>', function () {
    expect(component.find('Field').length).toBe(1);
  });

  it('should render the <DummyInput>', function () {
    expect(component.find('DummyInput').length).toBe(1);
  });
});

test('should generate input keys correctly based on the schema', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _form2.default,
    {
      type: 'insert',
      schema: new schemaStub({
        name: {
          type: String,
          srf: {
            type: DummyInput
          },
          label: 'foobarONE'
        },
        ignoreMeSenpai: {
          type: Number,
          srf: {
            type: DummyInput,
            omit: true
          },
          label: 'barfooTWO'
        }
      })
    },
    _react2.default.createElement(_field2.default, { fieldName: 'name', type: DummyInput }),
    _react2.default.createElement(_field2.default, { fieldName: 'deviceId', type: DummyInput })
  ));

  var generateInputsForKeys = component.instance().generateInputsForKeys.bind(component.instance());

  var nameComponent = generateInputsForKeys(['name'])[0];
  expect(nameComponent.key).toEqual('name');
  expect(nameComponent.props.fieldName).toEqual('name');

  var nameComponentWithParent = generateInputsForKeys(['name'], 'i.am.a.parent')[0];
  expect(nameComponentWithParent.key).toEqual('i.am.a.parent.name');
  expect(nameComponent.props.fieldName).toEqual('name');

  var omitComponent = generateInputsForKeys(['ignoreMeSenpai']);
  expect(omitComponent.length).toEqual(0);
});