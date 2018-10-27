from flask import Blueprint
from flask import render_template
from . import pso


@pso.route('', methods=['GET'])
def ask_for_image():
    return render_template('pso.html')






