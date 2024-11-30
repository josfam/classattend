"""Add empty defaults to first_name and last_name for pending students

Revision ID: a37a3271b06c
Revises: 
Create Date: 2024-11-30 18:29:14.540138

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a37a3271b06c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('student_classrooms')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'student_classrooms',
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('student_id', sa.INTEGER(), nullable=False),
        sa.Column('class_id', sa.INTEGER(), nullable=False),
        sa.ForeignKeyConstraint(
            ['class_id'],
            ['classrooms.id'],
        ),
        sa.ForeignKeyConstraint(
            ['student_id'],
            ['students.id'],
        ),
        sa.PrimaryKeyConstraint('id'),
    )
    # ### end Alembic commands ###
