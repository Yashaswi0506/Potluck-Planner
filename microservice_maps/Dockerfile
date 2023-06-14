# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN python -m pip install -r requirements.txt

# Copy the rest of your Flask application code into the container
COPY . .

# Expose the port on which your Flask application will run
EXPOSE 7000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Set the entry point command to run your Flask application
CMD ["python", "-u","app.py"]
