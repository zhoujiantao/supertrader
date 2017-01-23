from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.request import Request
from pyramid.request import Response



def request_factory(environ):
    request = Request(environ)
    if request.is_xhr:
        request.response = Response()
        request.response.headerlist = []
        request.response.headerlist.extend(
            (
                ('Access-Control-Allow-Origin', '*'),
                ('Content-Type', 'application/json')
            )
        )
    return request





if __name__ == '__main__':
    config = Configurator()
    config.set_request_factory(request_factory)
    config.include('pyramid_jinja2')
    config.add_static_view(name='static', path='static')

    config.add_route('index', '/')

    config.add_route('getProductByUser', '/{id}')



    config.scan('views')
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 5000, app)
    server.serve_forever()