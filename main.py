from flask import Flask, render_template


app = Flask(__name__, template_folder="templates")


@app.route('/', methods=['GET'])
def main():
    return render_template("main.html")


app.run()