FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install waitress && pip install -r requirements.txt

ENV FLASK_APP=double_label_back \
    FLASK_ENV=production \
    FLASK_DEBUG=on \
    CORS_URL=https://doublelabel.netlify.app

COPY . .

CMD [ "waitress-serve", "--port=5000", "--call", "double_label_back:create_app"]