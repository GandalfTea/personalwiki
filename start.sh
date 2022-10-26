
if python -c "import django, rest_framework" &> /dev/null; then
	echo ' Python requirements already satisfied.'
else
	pip install -r ./requirements.txt
fi

cd personalwiki && python manage.py runserver
