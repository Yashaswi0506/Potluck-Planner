# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your Flask application code into the container
COPY . .

# Expose the port on which your Flask application will run
EXPOSE 7000

# Set the entry point command to run your Flask application
CMD ["python", "app.py"]
