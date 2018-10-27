from flask import Blueprint
from flask import render_template

pso_api = Blueprint('pso_api', __name__)


@pso_api.route('', methods=['GET'])
def ask_for_image():
    return render_template('pso/pso.html')


