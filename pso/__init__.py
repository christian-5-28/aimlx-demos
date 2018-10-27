from flask import Blueprint

pso = Blueprint('pso', __name__, template_folder='templates', static_folder='static')

from . import pso_controller