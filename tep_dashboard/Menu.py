# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Menu(Component):
    """A Menu component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (optional):
    The ID used to identify this component in Dash callbacks.

- dashboards (optional):
    The list of dashboards displayed in the sidemenu.

- isOpen (optional):
    True if menu is open.

- setProps (optional):
    Dash-assigned callback that should be called to report property
    changes to Dash, to make them available for callbacks.

- toggle (optional):
    Callback to toggle open state."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, dashboards=Component.UNDEFINED, toggle=Component.UNDEFINED, isOpen=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'dashboards', 'isOpen', 'setProps', 'toggle']
        self._type = 'Menu'
        self._namespace = 'tep_dashboard'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'dashboards', 'isOpen', 'setProps', 'toggle']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Menu, self).__init__(**args)
