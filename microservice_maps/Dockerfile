
FROM python:3.9-slim


WORKDIR /app


COPY requirements.txt .


RUN python -m pip install -r requirements.txt


COPY . .


EXPOSE 7000


ENV PYTHONDONTWRITEBYTECODE=1


ENV PYTHONUNBUFFERED=1


CMD ["python", "-u","app.py"]
