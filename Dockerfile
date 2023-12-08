#use an official Node runtime as a parent image
FROM node:14 as build-stage

#set the working directory in the Docker container
WORKDIR /app

#copy the package.json and package-lock.json files
COPY package*.json ./

#install project dependencies
RUN npm install

#copy the project files into the Docker container
COPY . .

#build the app for production
RUN npm run build

#use nginx to serve the app
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

#expose port 80 and start nginx server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
