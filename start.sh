
if python -c "import django, rest_framework" &> /dev/null; then
	echo 'Requirements already installed.'
else
	pip install -r ./requirements.txt
fi

cd personalwiki && python manage.py runserver
