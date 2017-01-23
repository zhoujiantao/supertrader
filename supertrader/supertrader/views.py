import cgi

from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.view import view_config


# First view, available at http://localhost:6543/
@view_config(route_name='index', renderer='templates/index.jinja2')
def home_view(request):
    return {'a': 1}



@view_config(route_name='getProductByUser',renderer='json')
def get_product_by_user(request):
    return [1,2,3]


@view_config(route_name='hello')
class HelloWorldViews:
    def __init__(self, request):
        self.request = request
        # Our templates can now say {{ view.name }}
        self.name = request.matchdict['name']

    # Retrieving /howdy/amy the first time
    @view_config(renderer='hello.jinja2')
    def hello_view(self):
        return dict()

    # Posting to /howdy/amy via the "Edit" submit button
    @view_config(request_param='form.edit', renderer='edit.jinja2')
    def edit_view(self):
        print('Edited')
        return dict()

    # Posting to /howdy/amy via the "Delete" submit button
    @view_config(request_param='form.delete', renderer='delete.jinja2')
    def delete_view(self):
        print('Deleted')
        return dict()


