PYTHON_SITE_PACKAGES_PATH := \
	$(shell python -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())")

help:
	@echo "TODO: Write the install help"

install:
	# Create a local environment file
	cp deploy_environments/dev.build.env .env.development.local

	# Install npm dependencies
	npm install
	@echo "Requirements installed."

run:
	dev_appserver.py . --port=8080 --admin_port=8081

build_qa:
	# Create a local environment file
	cp deploy_environments/qa.build.env .env.production.local
	npm run build

build_prod:
	# Create a local environment file
	cp deploy_environments/prod.build.env .env.production.local
	npm run build

dev:
	npm run start

# Deploy to dev QA environment - must run build_qa first
deploy_qa:
	appcfg.py update -A divining-admin -V $(filter-out $@,$(MAKECMDGOALS)) ./app.yaml

# Deploy to Production environment - must run build_prod first
deploy_prod:
	appcfg.py update -A divrods-admin -V $(filter-out $@,$(MAKECMDGOALS)) ./app.yaml
