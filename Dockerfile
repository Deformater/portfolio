FROM python:3.8

WORKDIR C:\Users\Григорий

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "./wsgi.py"]